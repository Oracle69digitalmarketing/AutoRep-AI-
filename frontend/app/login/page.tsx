"use client";

import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || '/api/proxy';
      const res = await axios.post(`${backend}/auth/login`, { username, password });
      localStorage.setItem('token', res.data.access_token);
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;