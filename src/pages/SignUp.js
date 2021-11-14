import React, {useEffect, useRef, useState} from 'react';
import { useForm } from 'react-hook-form';
import "../styles/login.css";
import { post, put, getAll } from '../services';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserState } from '../actions';

const SignUp = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const userState = useSelector((state) => state);
    console.log(userState);
    const [resendCount, setResendCount] = useState(0);
    const [referralKeyValidation, setReferralKeyValidation] = useState(null);

    const { register, formState: { errors }, watch, handleSubmit, reset } = useForm();
    const { register: registerToken, formState: { errors: errorsToken }, handleSubmit: handleSubmitToken, reset: resetToken } = useForm();
    const { register: registerSignup, formState: { errors: errorsSignup }, handleSubmit: handleSubmitSignup, reset: resetSignup } = useForm();
    const [formVisibility, setFormVisibility] = useState({
        verifyEmail: true,
        verifyToken: false,
        signUp: false,
    });
    let userDetails = {
        verifyEmailResponse: {},
        resendVerificationResponse: {},
        verifyEmailTokenResponse: {},
        signUpResponse: {}
    };
    const [details, setDetail] = useState({ email: null, userDetails});

    const [isLoading, setIsloading] = useState(false);
    
    const onsubmit = (data) => {
        setIsloading(true);
        post(`https://hiring.getbasis.co/candidate/users/email`, data)
            .then((detail) => {
                console.log(detail);
                setIsloading(false);
                if (detail.results) {
                    reset();
                    setDetail({ ...details, email: data.email, userDetails: {...userDetails, verifyEmailResponse: detail.results} });
                    if (detail.results.isLogin) {
                        // let obj = {
                        //     email: data.email,
                        //     token: detail.results.token
                        // }
                        // login(obj);
                        alert('User already registered. Please login.');
                        navigate('/login');
                        return;
                    }
                    setFormVisibility({ ...formVisibility, verifyEmail: false, verifyToken: true });
                    
                }
                console.log(userDetails);

            });
        

    };
    const resendCode = () => {
        let obj = {
            email: details.email,
            token: "" + details.userDetails.verifyEmailResponse.token + ""
        };
        if (resendCount !== 3) {
            if (resendCount + 1 !== 4) {
                
                put('https://hiring.getbasis.co/candidate/users/token/resendtoken', obj)
                    .then((response) => {
                        console.log(response);
                    });
            }
            setResendCount(resendCount + 1);
        };
        if (resendCount == 3) {
            resetToken();
            alert('You have crossed the maximum limit of resend. Please start again.');
            setFormVisibility({ ...formVisibility, verifyEmail: true, verifyToken: false });

        };
    };
    // const login = (obj) => {
    //     put(`https://hiring.getbasis.co/candidate/users/email/verify`, obj)
    //         .then((response) => {
    //             console.log(response);
               
    //         });
    // };

    const onsubmitToken = (data) => {
        let obj = {
            ...data,
            email: details.email,
            token: `${details.userDetails.verifyEmailResponse.token}`
        };
        put(`https://hiring.getbasis.co/candidate/users/email/verify`, obj)
            .then((response) => {
                console.log(response);
                if (response.success === true) {
                    alert(response.message);
                    setFormVisibility({ ...formVisibility, verifyToken: false, signUp: true });
                } else {
                    alert(response.message);
                    resetToken();
                }
            });
    };
    const onsubmitSignup = (data) => {
        // console.log(data);
        let obj = {
            // ...data,
            email: details.email,
            token: `${details.userDetails.verifyEmailResponse.token}`,
            "firstName": data.firstName,
            "email": data.email,
            "referredCodeKey": data.referredCodeKey && data.referredCodeKey.toUpperCase(),
            "agreeToPrivacyPolicy": data.agreeToPrivacyPolicy,
            "token": `${details.userDetails.verifyEmailResponse.token}`,
            "source": "WEB_APP"
        };
        console.log(obj)
        post(`https://hiring.getbasis.co/candidate/users`, obj)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    localStorage.setItem('user', JSON.stringify({token: details.userDetails.verifyEmailResponse.token,response}));
                    dispatch(setUserState());
                    navigate('/profile');
                } else {
                    alert(response.message);
                }
                console.log(userState);
            });
    };
    const checkReferralKey = (e) => {
        
        if (e.target.value.trim().length < 1) {
            setReferralKeyValidation(null);
        } else {
            getAll(`https://hiring.getbasis.co/candidate/users/referral/${e.target.value.trim().toUpperCase()}`)
                .then(response => {
                    console.log(response);
                    if (!response.success) {
                    
                        setReferralKeyValidation(false);
                    } else {
                        setReferralKeyValidation(null);
                    }

                });
        }
    };
    return (
        <>
            <div className="container">
                <div className="top-level-wrapper">
                    {formVisibility.verifyEmail && <><form onSubmit={handleSubmit(onsubmit)} className="form">
                        
                        <div className="form-container">
                            <h3 className="h3 text-center mb-5">Verify Email</h3>
                            <div className="col-10">
                                <label htmlFor="verification-email">Enter email for verification</label>
                                <input type="email" id="verification-email" placeholder="Enter email" {...register('email', { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className="form-control" />
                                {(errors.email && errors.email.type === 'required') && <span className="error">This field is required</span>}
                                {(errors.email && errors.email.type === 'pattern') && <span className="error">Please enter a valid email</span>}
                            </div>
                            <div className="">
                                <button className="btn verification-btn" disabled={isLoading ? true : false}>
                                    {isLoading ? <div className="spinner-border spinner-border-sm"></div> : ''}
                                    
                                    Verify email
                                </button>
                            </div>
                            
                        </div>
                    </form></>}
                    {formVisibility.verifyToken && <><form onSubmit={handleSubmitToken(onsubmitToken)} className="form">
                        
                        <div className="form-container">
                            <h3 className="h3 text-center mb-5">Enter verification code</h3>
                            <span>A verification code has been sent to {details.email}</span>
                            <div className="col-10">
                                <label htmlFor="verification-email">Enter 6 digit code</label>
                                <input type="number" id="verification-email" placeholder="Enter code sent to email" {...registerToken('verificationCode', { required: true, pattern: /^(0|[1-9]\d*)$/, maxLength: 6, minLength: 6 })} className="form-control" />
                                {(errorsToken.verificationCode && errorsToken.verificationCode.type === 'required') && <span className="error">This field is required</span>}
                                {(errorsToken.verificationCode && errorsToken.verificationCode.type === 'pattern') && <span className="error">Please enter a valid token</span>}
                                {(errorsToken.verificationCode && (errorsToken.verificationCode.type === "maxLength" || errorsToken.verificationCode.type === "minLength")) && <span className="error">Minlength and Maxlength of code is 6</span>}
                            </div>
                            <div className="">
                                <button className="btn verification-btn" disabled={isLoading ? true : false}>
                                    {isLoading ? <div className="spinner-border spinner-border-sm"></div> : ''}
                                    
                                    Verify Code
                                </button>
                            </div>
                            <div className="resend-btn" onClick={resendCode}>Resend Token.</div>
                        </div>
                    </form></>}
                    {formVisibility.signUp && <><form onSubmit={handleSubmitSignup(onsubmitSignup)} className="form">
                        
                        <div className="form-container">
                            <h3 className="h3 text-center mb-5">Sign Up to Basis</h3>
                            <div className="col-10">
                                <label htmlFor="verification-email">Email<span className="star"> *</span></label>
                                <input type="email" defaultValue={details.email} readOnly id="verification-email" placeholder="Enter code sent to email" {...registerSignup('email', { required: true })} className="form-control" />
                                
                            </div>
                            <div className="col-10">
                                <label htmlFor="firstName">First Name <span className="star"> *</span></label>
                                <input type="text" id="firstName" placeholder="Enter code sent to email" {...registerSignup('firstName', { required: true })} className="form-control" />
                                {errorsSignup.firstName && <><span className="error">This field is required</span></>}
                            </div>
                            <div className="col-10">
                                <label htmlFor="referralKey">Referral Code If Any</label>
                                <input type="text" id="referralKey" placeholder="Enter referral code" {...registerSignup('referredCodeKey', { required: false, pattern: /^[a-zA-Z0-9]+$/, maxLength: 6, minLength: 6 })} className="form-control" onChange={(e) => {checkReferralKey(e)}} />
                                {errorsSignup.referredCodeKey && <><span className="error">Please enter a valid code</span></>}
                                {referralKeyValidation === false && <><span className="error">Invalid Code</span></>}

                                
                            </div>
                            <div className="col-10">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"  id="invalidCheck" required {...registerSignup('agreeToPrivacyPolicy', { required: true })}/>
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                        Agree to terms and conditions
                                    </label> <br />
                                    {errorsSignup.agreeToPrivacyPolicy && <><span className="error">Please agree to the terms and condition</span></>}
                                </div>
                            </div>
                            <div className="">
                                <button className="btn verification-btn" disabled={(isLoading || referralKeyValidation == false)? true : false}>
                                    {isLoading ? <div className="spinner-border spinner-border-sm"></div> : ''}
                                    
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form></>}
                    
                    
                </div>
            </div>
        </>
    );
};

export default SignUp;