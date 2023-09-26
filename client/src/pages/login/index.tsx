import React, { useState } from 'react';

interface RegisterProps {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
}

export const Login: React.FC<RegisterProps> = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(email);
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@gmail.com"
                    id="email"
                    name="email"
                />
                <label htmlFor="password">password</label>
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="******"
                    id="email"
                    name="email"
                />
                <button type="submit">Log in</button>
            </form>
            <button onClick={() => props.onFormSwitch('register')}>
                Don't have an account? Register here
            </button>
        </React.Fragment>
    );
};
