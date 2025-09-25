import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'consumer' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerUser(form);
      setSuccess('Registration successful! You can login now.');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="farmer">Farmer</option>
          <option value="distributor">Distributor</option>
          <option value="retailer">Retailer</option>
          <option value="consumer">Consumer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
    </div>
  );
};

export default Register;
