import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

const Login = ({ setRole }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleInput, setRoleInput] = useState('farmer');

    const handleSubmit = async () => {
        try {
            if (isRegister) {
                await registerUser({ username, password, role: roleInput });
                alert("Registration successful! Please login.");
                setIsRegister(false);
            } else {
                const res = await loginUser({ username, password });
                setRole(res.data.role);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Action failed");
        }
    };

    return (
        <div>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {isRegister && (
                <select value={roleInput} onChange={(e) => setRoleInput(e.target.value)}>
                    <option value="farmer">Farmer</option>
                    <option value="distributor">Distributor</option>
                    <option value="retailer">Retailer</option>
                    <option value="consumer">Consumer</option>
                </select>
            )}
            <button onClick={handleSubmit}>{isRegister ? "Register" : "Login"}</button>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Already have an account? Login" : "New user? Register"}
            </button>
        </div>
    );
};

export default Login;
