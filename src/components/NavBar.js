import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserState } from '../actions/index';
import { logout } from '../services';


const NavBar = () => {
    const userState = useSelector((state) => state);
    const dispatch = useDispatch();

    const logOut = () => {
        logout(`https://hiring.getbasis.co/candidate/users/logout/${userState.userState.token}`)
            .then(response => {
                console.log(response);
                if (response.success) {
                    localStorage.removeItem('user');
                    dispatch(setUserState());
                } else {
                    alert(response.message);
                }
            });


    };
    console.log(userState.userState)
    return (
        <>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Basis</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li> */}
                        
                            {userState.userState && <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userState.userState && <> <UserIcon /> {userState.userState.response.results.user.firstName }</>}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                                        <li><button className="btn" onClick={logOut}>Logout</button></li> 
                                    </ul>
                                </li>
                            </>}
                            {!userState.userState && <>
                                <li className="nav-item">
                                    <Link className="nav-link login-btn-anchor" to="/login">Login</Link>
                                </li>
                            </>}
                        
                    </ul>
                    
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;

const UserIcon = () => {
    return <>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
    </>
};