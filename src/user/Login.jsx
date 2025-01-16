import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

const api = axios.create({
    baseURL: "https://check-spamemails-2.onrender.com/auth",
    withCredentials: true,
});

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error on new attempt
        try {
            // Login attempt
            await api.post('/login', formData);

            // Fetch user data after successful login
            const userResponse = await api.get('/user');
            setUserData(userResponse.data);

        } catch (err) {
            // Handle error during login or user data fetch
            if (err.response && err.response.data) {
                setError(err.response.data.detail || 'Error: Login failed.');
            } else {
                setError('Error: Something went wrong. Please try again.');
            }
        }
    };

    // Clear the error message after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000);
            return () => clearTimeout(timer); // Cleanup timer on component unmount
        }
    }, [error]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {userData && (
                <div>
                    <h2>Welcome, {userData.username}</h2>
                    <p>Email: {userData.email}</p>
                </div>
            )}
        </div>
    );
}

export default Login;
