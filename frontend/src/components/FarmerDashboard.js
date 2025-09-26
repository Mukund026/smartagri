import React, { useState, useEffect } from 'react';
import { initWeb3, getAccounts, getContract } from '../utils/blockchain';
import axios from 'axios';

const FarmerDashboard = () => {
  const [form, setForm] = useState({
    origin: '',
    quality: '',
    quantity: 0,
    harvestDate: '',
    owner: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initWeb3();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddProduce = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/farmer/add', form, {
        headers: { Authorization: 'Bearer ' + token }
      });

      const accounts = await getAccounts();
      const contract = await getContract();

      await contract.methods.addProduce(
        form.origin, form.quality, form.quantity, form.harvestDate, form.owner
      ).send({ from: accounts[0], gas: 3000000 });

      alert('Produce added successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Farmer Dashboard</h2>
      <input name="origin" placeholder="Origin" onChange={handleInputChange} />
      <input name="quality" placeholder="Quality" onChange={handleInputChange} />
      <input name="quantity" type="number" placeholder="Quantity" onChange={handleInputChange} />
      <input name="harvestDate" placeholder="Harvest Date" onChange={handleInputChange} />
      <input name="owner" placeholder="Owner" onChange={handleInputChange} />
      <button onClick={handleAddProduce} disabled={loading}>
        {loading ? 'Adding...' : 'Add Produce'}
      </button>
    </div>
  );
};

export default FarmerDashboard;
