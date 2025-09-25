import React, { useState } from 'react';
import { getProduceDetails } from '../services/api';

const ConsumerDashboard = () => {
  const [produceId, setProduceId] = useState('');
  const [produceDetails, setProduceDetails] = useState(null);

  const handleFetch = async () => {
    const res = await getProduceDetails(produceId);
    setProduceDetails(res.data);
  };

  return (
    <div>
      <h2>Consumer Dashboard</h2>
      <input placeholder="Produce ID" value={produceId} onChange={e => setProduceId(e.target.value)} />
      <button onClick={handleFetch}>Get Produce Details</button>

      {produceDetails && (
        <div>
          <h3>Produce Details</h3>
          <p>Origin: {produceDetails.produce.origin}</p>
          <p>Quality: {produceDetails.produce.quality}</p>
          <p>Quantity: {produceDetails.produce.quantity}</p>
          <p>Harvest Date: {produceDetails.produce.harvestDate}</p>
          <p>Owner: {produceDetails.produce.owner}</p>
          <p>Sustainability Score: {produceDetails.sustainabilityScore}</p>
        </div>
      )}
    </div>
  );
};

export default ConsumerDashboard;
