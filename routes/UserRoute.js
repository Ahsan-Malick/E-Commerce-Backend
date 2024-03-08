const express = require('express');
const { fetchUser } = require('../controller/UserController');
const passport = require('passport');
const router = express.Router();


router.get('/',passport.authenticate('jwt'),fetchUser);
module.exports = router;