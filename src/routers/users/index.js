const express = require('express');
const router = express.Router();
const ctrl = require('./ctrl');

/* GET home page. */
router.get('/getUsersInfo', ctrl.getUsersInfo);
router.get('/login', ctrl.login);
router.get('/signUp', ctrl.signUp);
router.get('/setUserPw', ctrl.setUserPw);
router.get('/getAuthPhone', ctrl.getAuthPhone);

module.exports = router;
