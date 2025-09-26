import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('farmer');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('role', role);
    navigate('/' + role);
  };

  return (
    <div>
      <h2>Login</h2>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="farmer">Farmer</option>
        <option value="distributor">Distributor</option>
        <option value="retailer">Retailer</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
