const express = require('express');
const {createUser, loginUser, checkUser } = require('../controller/AuthController');
const passport = require('passport');
const router = express.Router();

router.post('/', createUser).post('/login', passport.authenticate('local'), loginUser).get('/check',  passport.authenticate('jwt'),checkUser);

module.exports = router;