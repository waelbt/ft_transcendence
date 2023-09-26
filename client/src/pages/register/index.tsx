import React, { useState } from 'react';
import './index.scss';

interface RegisterProps {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
}

export const Register: React.FC<RegisterProps> = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [name, setName] = useState('');

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
                    <div className="form-label-input">
                        <label className="form-label" htmlFor="name">
                            Full name
                        </label>
                        <input
                            className="form-input"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Wael boutzougarte"
                            id="name"
                            name="name"
                        />
                    </div>
                    <div className="form-label-input">
                        <label className="form-label" htmlFor="name">
                            Email
                        </label>
                        <input
                            className="form-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="wael@student.1337.ma"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="form-label-input">
                        <label className="form-label" htmlFor="pass">
                            Password
                        </label>
                        <input
                            className="form-input"
                            type="pass"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="●●●●●●●●●●"
                            id="pass"
                            name="pass"
                        />
                    </div>
                    <div className="form-label-input">
                        <label className="form-label" htmlFor="confirm-pass">
                            Confirm password
                        </label>
                        <input
                            className="form-input"
                            type="confirm-pass"
                            value={confirmPass} // implement password confirmation
                            onChange={(e) => setConfirmPass(e.target.value)}
                            placeholder="●●●●●●●●●●"
                            id="confirm-pass"
                            name="confirm-pass"
                        />
                    </div>
                </form>
                <button
                    className="sign-up-btn"
                    // onClick={() => props.onFormSwitch('login')}
                >
                    <span className="button-text-btn-text">Sign up</span>
                </button>
                <div
                    className="login-label"
                    onClick={() => props.onFormSwitch('login')}
                >
                    already have an account?{' '}
                    <span className="login-link">Log-in</span>
                </div>
            </div>
        </div>
    );
};
