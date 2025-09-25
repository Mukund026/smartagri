const express = require('express');
const { updateStock } = require('../controllers/retailerController');
const router = express.Router();

router.post('/updateStock', updateStock);

module.exports = router;
