import React, { useState, useEffect } from 'react';
import { getAccounts, getContract, initWeb3 } from '../utils/blockchain';
import axios from 'axios';

const DistributorDashboard = () => {
  const [produceId, setProduceId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initWeb3();
  }, []);

  const handleTransfer = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/distributor/transfer', { produceId, newOwner }, {
        headers: { Authorization: 'Bearer ' + token }
      });

      const accounts = await getAccounts();
      const contract = await getContract();

      await contract.methods.transferProduce(produceId, newOwner)
        .send({ from: accounts[0], gas: 3000000 });

      alert('Produce transferred successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Distributor Dashboard</h2>
      <input type="text" placeholder="Produce ID" onChange={e => setProduceId(e.target.value)} />
      <input type="text" placeholder="New Owner" onChange={e => setNewOwner(e.target.value)} />
      <button onClick={handleTransfer} disabled={loading}>
        {loading ? 'Transferring...' : 'Transfer Produce'}
      </button>
    </div>
  );
};

export default DistributorDashboard;
