import React, { useState } from 'react';
import './index.scss';
import InputField from './InputField';

interface RegisterProps {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
}

export const Register: React.FC<RegisterProps> = (props) => {
    const inputFieldProps = [
        {
            State: useState(''),
            label: 'Full name',
            placeholder: 'Wael boutzougarte',
            type: 'text'
        },
        {
            State: useState(''),
            label: 'Email',
            placeholder: 'example@youremail.com',
            type: 'email'
        },
        {
            State: useState(''),
            label: 'Password',
            placeholder: '',
            type: 'hide',
            secure: true
        },
        {
            State: useState(''),
            label: 'Confirm Password',
            placeholder: '',
            type: 'hide',
            secure: true
        }
    ];

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };

    return (
        <React.Fragment>
            <form className="register-form" onSubmit={handleSubmit}>
                {inputFieldProps.map((props, index) => (
                    <InputField {...props} key={index} />
                ))}
            </form>
            <button className="sign-up-btn">
                <span className="button-text-btn-text">Sign up</span>
            </button>
            <div
                className="login-label"
                onClick={() => props.onFormSwitch('login')}
            >
                already have an account?{' '}
                <span className="login-link">Log-in</span>
            </div>
        </React.Fragment>
    );
};
