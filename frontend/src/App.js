import React, { useState } from 'react';
import FarmerDashboard from './components/FarmerDashboard';
import DistributorDashboard from './components/DistributorDashboard';
import RetailerDashboard from './components/RetailerDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import QRScanner from './components/QRScanner';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [showLogin, setShowLogin] = useState(true);

  const toggleLoginRegister = () => setShowLogin(!showLogin);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole(null);
    setShowLogin(true);
  };

  if (!role) {
    return showLogin ? (
      <Login setRole={setRole} switchToRegister={toggleLoginRegister} />
    ) : (
      <Register switchToLogin={toggleLoginRegister} />
    );
  }

  return (
    <Router>
      <div>
        <button onClick={handleLogout}>Logout</button>

        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<ProtectedRoute role="farmer" userRole={role} />}>
            <Route path="/farmer" element={<FarmerDashboard />} />
          </Route>

          <Route element={<ProtectedRoute role="distributor" userRole={role} />}>
            <Route path="/distributor" element={<DistributorDashboard />} />
          </Route>

          <Route element={<ProtectedRoute role="retailer" userRole={role} />}>
            <Route path="/retailer" element={<RetailerDashboard />} />
          </Route>

          <Route element={<ProtectedRoute role="consumer" userRole={role} />}>
            <Route path="/consumer" element={<ConsumerDashboard />} />
          </Route>

          {/* Default redirect */}
          <Route path="*" element={<Navigate to={`/${role}`} />} />
        </Routes>

        <QRScanner />
      </div>
    </Router>
  );
}

export default App;
