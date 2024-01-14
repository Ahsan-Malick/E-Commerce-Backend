const express = require('express');
const { createProduct } = require('../controller/ProductsController');
const { Product } = require("../model/ProductsModel");
const { fetchAllProducts } = require('../controller/ProductsController');
const router = express.Router();




router.post('/', createProduct).get('/', fetchAllProducts);




module.exports = router;