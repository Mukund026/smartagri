const express = require('express');
const { addProduce, getProduces } = require('../controllers/farmerController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/add', verifyToken, checkRole('farmer'), addProduce);
router.get('/produces', verifyToken, checkRole('farmer'), getProduces);

module.exports = router;
