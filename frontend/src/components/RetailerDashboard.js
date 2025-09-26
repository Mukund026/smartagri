import React, { useState, useEffect } from 'react';
import { initWeb3, getContract } from '../utils/blockchain';

const RetailerDashboard = () => {
  const [produceId, setProduceId] = useState('');
  const [produce, setProduce] = useState(null);

  useEffect(() => {
    initWeb3();
  }, []);

  const handleGetProduce = async () => {
    try {
      const contract = await getContract();
      const data = await contract.methods.getProduce(produceId).call();
      setProduce(data);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Retailer Dashboard</h2>
      <input type="text" placeholder="Produce ID" onChange={e => setProduceId(e.target.value)} />
      <button onClick={handleGetProduce}>Get Produce Details</button>
      {produce && (
        <div>
          <p>Origin: {produce.origin}</p>
          <p>Quality: {produce.quality}</p>
          <p>Quantity: {produce.quantity}</p>
          <p>Harvest Date: {produce.harvestDate}</p>
          <p>Owner: {produce.owner}</p>
          <p>Timestamp: {new Date(produce.timestamp * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default RetailerDashboard;
