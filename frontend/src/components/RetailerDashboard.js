import React, { useState } from 'react';
import { updateStock } from '../services/api';

const RetailerDashboard = () => {
  const [produceId, setProduceId] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');

  const handleUpdateStock = async () => {
    await updateStock({ produceId, stock, price });
    alert("Stock updated successfully");
  };

  return (
    <div>
      <h2>Retailer Dashboard</h2>
      <input placeholder="Produce ID" value={produceId} onChange={e => setProduceId(e.target.value)} />
      <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={handleUpdateStock}>Update Stock</button>
    </div>
  );
};

export default RetailerDashboard;
