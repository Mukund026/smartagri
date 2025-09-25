const express = require('express');
const { transferProduce } = require('../controllers/distributorController');
const router = express.Router();

router.post('/transfer', transferProduce);

module.exports = router;
