"use client";

import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || '/api/proxy';
      await axios.post(`${backend}/auth/register`, { username, password });
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '10px' }}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterPage;