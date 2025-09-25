require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const distributorRoutes = require('./routes/distributorRoutes');
const retailerRoutes = require('./routes/retailerRoutes');
const consumerRoutes = require('./routes/consumerRoutes');

const app = express();

app.use('/api/distributor', require('./routes/distributorRoutes'));
app.use('/api/retailer', require('./routes/retailerRoutes'));
app.use('/api/consumer', require('./routes/consumerRoutes'));

app.use(cors());
app.use(express.json());

// Register all API routes with appropriate versioning/path
app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/distributor', distributorRoutes);
app.use('/api/retailer', retailerRoutes);
app.use('/api/consumer', consumerRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
