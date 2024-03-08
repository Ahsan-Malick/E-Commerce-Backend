const express = require('express');
const { getOrderDetail, postOrderDetail } = require('../controller/OrderController');
const router = express.Router();

router.get('/', getOrderDetail).post('/', postOrderDetail);

module.exports=router;