import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';



const Login = () => {
    const { register, formState: { errors }, watch, handleSubmit, reset } = useForm();
    const onsubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="container">
                <div className="top-level-wrapper">
                    <form onSubmit={handleSubmit(onsubmit)} className="form">
                        
                        <div className="form-container">
                            <h3 className="h3 text-center mb-5">Login to basis</h3>
                            <div className="col-10">
                                <label htmlFor="verification-email">Enter email </label>
                                <input type="email" id="verification-email" placeholder="Enter email" {...register('email', { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className="form-control" />
                                {(errors.email && errors.email.type === 'required') && <span className="error">This field is required</span>}
                                {(errors.email && errors.email.type === 'pattern') && <span className="error">Please enter a valid email</span>}
                            </div>
                            <div className="col-10">
                                <label htmlFor="verification-email">Enter Password </label>
                                <input type="password" id="verification-email" placeholder="Enter email" {...register('password', { required: true })} className="form-control" />
                                {(errors.password && errors.password.type === 'required') && <span className="error">This field is required</span>}
                                
                            </div>
                            <div className="">
                                <button className="btn verification-btn" >                                    
                                    Login
                                </button>
                        </div>
                        <div className="signup-link">
                            <Link to="/signup">New User! Signup</Link>
                        </div>

                            
                        </div>
                    </form>
                    
                    
                    
                    
                </div>
            </div>
    );
};

export default Login;