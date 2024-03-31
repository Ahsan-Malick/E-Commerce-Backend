const express = require('express');
const { getOrderDetail, postOrderDetail, deleteOrderDetail } = require('../controller/OrderController');
const router = express.Router();

router.get('/', getOrderDetail).post('/', postOrderDetail).delete('/', deleteOrderDetail);

module.exports=router;