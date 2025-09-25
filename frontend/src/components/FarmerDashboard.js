import React, { useState, useEffect } from 'react';
import { addProduce, getProduces } from '../services/api';

const FarmerDashboard = () => {
  const [produces, setProduces] = useState([]);
  const [form, setForm] = useState({
    origin: '', quality: '', quantity: '', harvestDate: '', owner: '',
  });

  const loadProduces = async () => {
    const res = await getProduces();
    setProduces(res.data);
  };

  const handleAddProduce = async () => {
    await addProduce(form);
    loadProduces();
  };

  useEffect(() => { loadProduces(); }, []);

  return (
    <div>
      <h2>Farmer Dashboard</h2>
      <input placeholder="Origin" onChange={e => setForm({ ...form, origin: e.target.value })} />
      <input placeholder="Quality" onChange={e => setForm({ ...form, quality: e.target.value })} />
      <input placeholder="Quantity" type="number" onChange={e => setForm({ ...form, quantity: e.target.value })} />
      <input placeholder="Harvest Date" onChange={e => setForm({ ...form, harvestDate: e.target.value })} />
      <input placeholder="Owner" onChange={e => setForm({ ...form, owner: e.target.value })} />
      <button onClick={handleAddProduce}>Add Produce</button>

      <h3>My Produces</h3>
      {produces.map(p => (
        <div key={p._id}>
          <p>{p.origin} - {p.quality} - {p.quantity}</p>
          <img src={p.qrCode} alt="QR Code" width="100" />
        </div>
      ))}
    </div>
  );
};

export default FarmerDashboard;
