const express = require('express');
const { updateStock } = require('../controllers/retailerController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/updateStock', verifyToken, checkRole('retailer'), updateStock);

module.exports = router;
