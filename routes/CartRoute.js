const express = require('express');
const {postCart, deleteCart, getCartByUser, updateCart, resetCart } = require('../controller/CartController');
const router = express.Router();




router.post('/', postCart).get('/', getCartByUser).delete('/:id',deleteCart).patch('/',updateCart).get('/reset', resetCart);




module.exports = router;