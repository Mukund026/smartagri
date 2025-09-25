const express = require('express');
const { getProduceDetails } = require('../controllers/consumerController');
const router = express.Router();

router.get('/:id', getProduceDetails);

module.exports = router;
