import React from 'react';
import InputField from './InputField';
import './LoginRegisterForm.scss';

type RegisterFormProps = {
    onFormSwitch: (formName: string) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const inputFieldProps = [
        {
            label: 'Full name',
            type: 'text',
            placeholder: 'Wael boutzougarte'
        },
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
        },
        {
            label: 'Confirm Password',
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
