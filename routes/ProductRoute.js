const express = require('express');
const { createProduct, fetchProductById, deleteAllProducts } = require('../controller/ProductsController');
const { fetchAllProducts } = require('../controller/ProductsController');
const router = express.Router();




router.post('/', createProduct).get('/', fetchAllProducts).get('/:id', fetchProductById).delete('/', deleteAllProducts);



module.exports = router;