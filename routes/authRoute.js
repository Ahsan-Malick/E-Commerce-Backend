const express = require('express');
const {createUser, loginUser, checkUser,updateUserName, updatePassword, authCheck } = require('../controller/AuthController');
const passport = require('passport');
const router = express.Router();

router.post('/', createUser).post('/login', passport.authenticate('local'), loginUser).get("/authcheck", passport.authenticate("jwt"), authCheck).patch('/check',  passport.authenticate('jwt'),checkUser).patch('/', passport.authenticate('jwt'),updateUserName).patch('/pass', passport.authenticate('jwt'),updatePassword);

module.exports = router;