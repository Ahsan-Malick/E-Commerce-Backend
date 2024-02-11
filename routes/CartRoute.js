const express = require('express');
const {postCart, getCart, deleteCart, getCartById } = require('../controller/CartController');
const router = express.Router();




router.post('/', postCart).get('/', getCart).delete('/:id',deleteCart).get('/user', getCartById);




module.exports = router;