const express = require('express');
const router = express.Router();
const usersRouter = require('./users')


//router use 부분
router.use('/users', usersRouter);

module.exports = router;