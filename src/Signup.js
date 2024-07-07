// Signup.js

import React, { useState } from 'react';
import './App.css'; // Import your updated CSS file

function Signup({ onSignup }) {
    const [userData, setUserData] = useState({ username: '', password: '', email: '' });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup(userData);
    };

    return (
        <div className="login-container"> {/* Use the same container class for styling */}
            <h2>Signup</h2>
            <form className="login-form" onSubmit={handleSubmit}> {/* Use the same form class for styling */}
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Enter your username" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Enter your password" />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Enter your email" />
                </div>
                <button type="submit">Signup</button>
            </form>
            <div className="login-footer"> {/* Use the same footer class for styling */}
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
}

export default Signup;
