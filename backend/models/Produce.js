// backend/models/Produce.js
const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
    origin: String,
    quality: String,
    quantity: Number,
    harvestDate: String,
    owner: String,
    qrCode: String,
    timestamps: [{ status: String, time: Date }],
});

module.exports = mongoose.model('Produce', produceSchema);
