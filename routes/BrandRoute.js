const express = require('express');
const { fetchBrands } = require('../controller/BrandController');
const router = express.Router();




router.get('/', fetchBrands);




module.exports = router;