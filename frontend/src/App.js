import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FarmerDashboard from './components/FarmerDashboard';
import DistributorDashboard from './components/DistributorDashboard';
import RetailerDashboard from './components/RetailerDashboard';
import Login from './components/Login';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/farmer" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
        <Route path="/distributor" element={<ProtectedRoute role="distributor"><DistributorDashboard /></ProtectedRoute>} />
        <Route path="/retailer" element={<ProtectedRoute role="retailer"><RetailerDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
