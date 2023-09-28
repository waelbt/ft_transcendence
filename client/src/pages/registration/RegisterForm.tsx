import React from 'react';
import './form.scss';
import InputField from './InputField';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
};

export const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const inputFieldProps = [
        {
            label: 'Full name',
            placeholder: 'Wael boutzougarte',
            type: 'text'
        },
        {
            label: 'Email',
            placeholder: 'example@youremail.com',
            type: 'email'
        },
        {
            label: 'Password',
            placeholder: '',
            type: 'hide',
            secure: true
        },
        {
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
            <button className="form-btn">
                <span className="button-text">Sign up</span>
            </button>
            <div
                className="form-label"
                onClick={() => props.onFormSwitch('login')}
            >
                already have an account?{' '}
                <span className="form-link">Log-in</span>
            </div>
        </React.Fragment>
    );
};
