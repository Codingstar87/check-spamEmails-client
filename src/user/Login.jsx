import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const api = axios.create({
    baseURL: "https://check-spamemails-2.onrender.com/auth", // Fixed baseURL
    withCredentials: true,
});

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Perform login
            await api.post('/login', formData);

            // Fetch user data upon successful login
            const userResponse = await api.get('/user');
            setUserData(userResponse.data);
            setError('');
        } catch (err) {
            if (err.response && err.response.data) {
                // Extract detail from the backend error response
                setError(err.response.data.detail || 'Error: Login failed.');
            } else {
                // Handle unexpected errors
                setError('Error: Something went wrong. Please try again.');
            }

            // Clear the error message after 5 seconds
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

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
