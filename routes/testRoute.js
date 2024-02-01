var express = require('express');
const router = express.Router();

router.get('/login', (req, res, next)=>{ res.render('../views/login.ejs')});

module.exports = router;