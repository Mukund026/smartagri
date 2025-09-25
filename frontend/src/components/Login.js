import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = ({ setRole, switchToRegister }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError('');
    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setRole(res.data.role);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Don't have an account?{' '}
        <button onClick={switchToRegister}>Register here</button>
      </p>
    </div>
  );
};

export default Login;
