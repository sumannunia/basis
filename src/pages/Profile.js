import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const userState = useSelector((state) => state);
    let navigate = useNavigate();
    useEffect(() => {
        if (!userState.userState) {
            navigate('/signup?return-url=/profile');
        }
    }, [userState])
    return (
        <>
            {userState.userState && <div className="container">
                <h3 className="h3 mt-5 text-center profile-title">User Profile</h3>

                <div className="profile-info-block">
                    <div className="col-12">
                        <div className="col-wrapper mb-3">
                            <span className="label">Name</span>
                            <span className="value">: {userState.userState.response.results.user.firstName}</span>
                        </div>
                        <div className="col-wrapper mb-3">
                            <span className="label">Phone Number</span>
                            <span className="value">: {userState.userState.response.results.user.phoneNumber}</span>
                        </div>
                        <div className="col-wrapper">
                            <span className="label">Email</span>
                            <span className="value">: {userState.userState.response.results.user.email}</span>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Profile;