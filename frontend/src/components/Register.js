import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = ({ switchToLogin }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'consumer', // default role, can let user choose if wanted
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerUser(form);
      setSuccess('Registration successful! You can now log in.');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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
        {/* Optional: role select */}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="farmer">Farmer</option>
          <option value="distributor">Distributor</option>
          <option value="retailer">Retailer</option>
          <option value="consumer">Consumer</option>
        </select>

        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <p>
        Already have an account?{' '}
        <button onClick={switchToLogin}>Login here</button>
      </p>
    </div>
  );
};

export default Register;
