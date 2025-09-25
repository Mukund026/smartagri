const express = require('express');
const { getProduceDetails } = require('../controllers/consumerController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.get('/:id', verifyToken, checkRole('consumer'), getProduceDetails);

module.exports = router;
