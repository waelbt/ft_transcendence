import { useState } from 'react';
import { Register } from './Register';
import { Login } from './Login';


function Registration() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleFormm = (formName: string) => {
        setCurrentForm(formName);
    };

    return (
        <div>
            {currentForm === 'login' ? (
                <Login onFormSwitch={toggleFormm} />
            ) : (
                <Register onFormSwitch={toggleFormm} />
            )}
        </div>
    );
}

export default Registration;
