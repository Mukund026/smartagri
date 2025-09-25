import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './routes/ProtectedRoute';

import Login from './components/Login';
import Register from './components/Register';
import Unauthorized from './components/Unauthorized';

import FarmerDashboard from './components/FarmerDashboard';
import DistributorDashboard from './components/DistributorDashboard';
import RetailerDashboard from './components/RetailerDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';

const AppRoutes = () => {
  const { userRole } = useContext(AuthContext);

  if (!userRole) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <>
      <Sidebar />
      <Routes>
        <Route 
          path="/farmer" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/distributor" 
          element={
            <ProtectedRoute allowedRoles={['distributor']}>
              <DistributorDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/retailer" 
          element={
            <ProtectedRoute allowedRoles={['retailer']}>
              <RetailerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/consumer" 
          element={
            <ProtectedRoute allowedRoles={['consumer']}>
              <ConsumerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to={`/${userRole}`} />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
