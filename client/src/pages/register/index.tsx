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
        <>
            <form className="register-container" onSubmit={handleSubmit}>
                <div className="third-party-btns">
                    <div className="intra-btn">
                        <span className="intra-btn-logo"></span>
                        <span className="intra-btn-text">Network</span>
                    </div>
                    <button className="google-btn"></button>
                </div>
                <div className="register-form">
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
                </div>
                <div
                    className="sign-up-btn"
                    // onClick={() => props.onFormSwitch('login')}
                >
                    <span className="button-text-btn-text">Sign up</span>
                </div>
                <div
                    className="login-label"
                    onClick={() => props.onFormSwitch('login')}
                >
                    already have an account?{' '}
                    <span className="login-link">Log-in</span>
                </div>
            </form>
        </>
    );
};
