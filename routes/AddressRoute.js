const express = require('express');
const { fetchAddress, fetchAddressById, createAddress, deleteAddress } = require('../controller/AddressController');
const router = express.Router();




router.get('/', fetchAddress).get('/:id', fetchAddressById ).patch('/', createAddress).delete('/:id',deleteAddress);



module.exports = router;