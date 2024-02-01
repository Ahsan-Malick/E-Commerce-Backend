const express = require('express');
const { fetchCategory } = require('../controller/CategoryController');
const router = express.Router();




router.get('/', fetchCategory);




module.exports = router;