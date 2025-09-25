import React, { useState } from 'react';
import { transferProduce } from '../services/api';

const DistributorDashboard = () => {
  const [produceId, setProduceId] = useState('');
  const [newOwner, setNewOwner] = useState('');

  const handleTransfer = async () => {
    await transferProduce({ produceId, newOwner });
    alert("Produce transferred");
  };

  return (
    <div>
      <h2>Distributor Dashboard</h2>
      <input placeholder="Produce ID" value={produceId} onChange={e => setProduceId(e.target.value)} />
      <input placeholder="New Owner" value={newOwner} onChange={e => setNewOwner(e.target.value)} />
      <button onClick={handleTransfer}>Transfer Produce</button>
    </div>
  );
};

export default DistributorDashboard;
