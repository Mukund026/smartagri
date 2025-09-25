import React, { useState } from 'react';
import Login from './components/Login';
import FarmerDashboard from './components/FarmerDashboard';
import DistributorDashboard from './components/DistributorDashboard';
import RetailerDashboard from './components/RetailerDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import QRScanner from './components/QRScanner';
import './styles/main.css';

function App() {
  const [role, setRole] = useState(null);

  if (!role) return <Login setRole={setRole} />;

  return (
    <div>
      {role === "farmer" && <FarmerDashboard />}
      {role === "distributor" && <DistributorDashboard />}
      {role === "retailer" && <RetailerDashboard />}
      {role === "consumer" && <ConsumerDashboard />}
      <QRScanner />
    </div>
  );
}

export default App;
