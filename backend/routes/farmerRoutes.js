const express = require('express');
const { addProduce, getAllProduces } = require('../controllers/farmerController');
const router = express.Router();

router.post('/add', addProduce);
router.get('/produces', getAllProduces);

module.exports = router;
