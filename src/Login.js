// Login.js

import React, { useState } from 'react';
import './App.css'; // Import your updated CSS file

function Login({ onLogin }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Enter your username" />
                </div>
                <div>
                    <label >Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Enter your password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="login-footer">
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
        </div>
    );
}

export default Login;
