import { useState } from 'react';
// import RegisterForm from './RegisterForm';
import { LoginForm } from './LoginForm';
import './index.scss';

function Registration() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleFormm = (formName: string) => {
        setCurrentForm(formName);
    };

    return (
        <div className="register">
            <div className="register-header">
                <div className="register-header-text">who want to play</div>
                <div className="register-header-text">Video games?</div>
            </div>
            <div className="register-container">
                <div className="third-party-btns">
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
                {/* {currentForm === 'login' ? ( */}
                <LoginForm onFormSwitch={toggleFormm} />
                {/* ) : ( */}
                {/* <RegisterForm onFormSwitch={toggleFormm} /> */}
                {/* )}{' '} */}
            </div>
        </div>
    );
}

export default Registration;
