const express = require('express');
const { transferProduce } = require('../controllers/distributorController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/transfer', verifyToken, checkRole('distributor'), transferProduce);

module.exports = router;
