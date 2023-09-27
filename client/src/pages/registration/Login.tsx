import React, { useState } from 'react';
import './index.scss';
import InputField from './InputField';

interface RegisterProps {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
}

export const Login: React.FC<RegisterProps> = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(email);
    };

    return (
        <div className="register">
            <div className="register-header">
                <div className="register-header-text">How want to play</div>
                <div className="register-header-text">Video games?</div>
            </div>
            <div className="register-container">
                <div className="third-party-btns">
                    <button className="intra-btn default">
                        <span className="intra-btn-logo"></span>
                        <span className="intra-btn-text">Network</span>
                    </button>
                    <button className="google-btn default">
                        <span className="google-btn-logo"></span>
                        <span className="google-btn-text">
                            G<span className="red">o</span>
                            <span className="yellow">o</span>
                            <span>g</span>
                            <span className="green">l</span>
                            <span className="red">e</span>
                        </span>
                    </button>
                </div>
                <div className="or-separator">
                    <span className="or-separator-line"></span>
                    <p className="or-separator-text">or</p>
                    <span className="or-separator-line"></span>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <InputField
                        value={email}
                        label="Email"
                        placeholder="example@youremail.com"
                        type="email"
                        onChange={setEmail}
                    ></InputField>
                    <InputField
                        value={pass}
                        label="pass"
                        placeholder=""
                        type="pass"
                        onChange={setPass}
                        secure={true}
                    ></InputField>
                </form>
                <button
                    className="sign-up-btn"
                    // onClick={() => props.onFormSwitch('login')}
                >
                    <span className="button-text-btn-text">Log in</span>
                </button>
                <div
                    className="login-label"
                    onClick={() => props.onFormSwitch('register')}
                >
                    Don't have an account?{' '}
                    <span className="login-link">Register here</span>
                </div>
            </div>
        </div>
    );
};
