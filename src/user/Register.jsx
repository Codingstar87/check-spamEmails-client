import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const api = axios.create({
    baseURL: 'https://check-spamemails-2.onrender.com/auth',  
    withCredentials: true,  
});

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', formData);
            setMessage(response.data.message || 'User registered successfully!');
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.detail || 'Error: Registration failed.');
            } else {
                setMessage('Error: Something went wrong. Please try again.');
            }
        } finally {
            // Clear the message after 5 seconds
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
