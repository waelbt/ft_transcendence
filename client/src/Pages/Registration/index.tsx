import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './index.scss';

function Registration() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleFormm = (formName: string) => {
        setCurrentForm(formName);
    };

    return (
        <div className="card">
            <div className="header">
                <div className="text">who want to play<br/>Video games?</div>
            </div>
            <div className="card-container">
                <div className="buttons">
                    <button className="intra-btn default">
                        <span className="intra-btn-logo default-logo"></span>
                        <span className="intra-btn-text default-text">
                            Network
                        </span>
                    </button>
                    <button className="google-btn default">
                        <span className="google-btn-logo default-logo "></span>
                        <span className="google-btn-text default-text">
                            G<span className="r">o</span>
                            <span className="y">o</span>
                            <span>g</span>
                            <span className="g">l</span>
                            <span className="r">e</span>
                        </span>
                    </button>
                </div>
                <div className="or-separator">
                    <span className="or-separator-line"></span>
                    or
                    <span className="or-separator-line"></span>
                </div>{' '}
                {currentForm === 'login' ? (
                    <LoginForm onFormSwitch={toggleFormm} />
                ) : (
                    <RegisterForm onFormSwitch={toggleFormm} />
                )}{' '}
            </div>
        </div>
    );
}

export default Registration;
