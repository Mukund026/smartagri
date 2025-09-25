const express = require('express');
const { addProduce, getAllProduces } = require('../controllers/farmerController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/add', verifyToken, checkRole('farmer'), addProduce);
router.get('/produces', verifyToken, checkRole('farmer'), getAllProduces);

module.exports = router;
