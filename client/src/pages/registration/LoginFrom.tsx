import React from 'react';
import './LoginRegisterForm.scss';
import InputField from './InputField';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
};

export const LoginForm: React.FC<RegisterFormProps> = (props) => {
    const inputFieldProps = [
        {
            label: 'Email',
            type: 'email',
            placeholder: 'example@youremail.com'
        },
        {
            label: 'Password',
            type: 'hide',
            placeholder: '',
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
                <span className="button-text">Log in</span>
            </button>
            <div
                className="form-label"
                onClick={() => props.onFormSwitch('register')}
            >
                Don't have an account?{' '}
                <span className="form-link">Register here</span>
            </div>
        </React.Fragment>
    );
};
