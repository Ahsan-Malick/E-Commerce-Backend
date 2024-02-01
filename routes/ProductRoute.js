const express = require('express');
const { createProduct, fetchProductById } = require('../controller/ProductsController');
const { fetchAllProducts } = require('../controller/ProductsController');
const router = express.Router();




router.post('/', createProduct).get('/', fetchAllProducts).get('/:id', fetchProductById);



module.exports = router;