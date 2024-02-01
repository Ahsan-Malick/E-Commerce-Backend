const express = require('express');
const { fetchUser, createUser, loginUser, checkUser } = require('../controller/UserController');
const passport = require('passport');
const router = express.Router();


router.get('/',fetchUser).post('/', createUser).post('/login', passport.authenticate('local'), loginUser).get('/check', checkUser);

module.exports = router;