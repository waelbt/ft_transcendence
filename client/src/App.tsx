import './App.scss';
import React, { useState } from 'react';
import { Login } from './pages/login';
import { Register } from './pages/register';

function App() {
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

export default App;
