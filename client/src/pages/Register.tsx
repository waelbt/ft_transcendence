import React, { useState } from 'react';

interface RegisterProps {
    onFormSwitch: (formName: string) => void; // Define the onFormSwitch prop
}

export const Register : React.FC<RegisterProps> = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(email);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="full Name"
                    id="email"
                    name="email"
                />
                <button type="submit">Log in</button>
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
            <button onClick={() => props.onFormSwitch('login')}>
                already have an account? Login here
            </button>
        </>
    );
};
