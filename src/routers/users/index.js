const express = require('express');
const router = express.Router();
const ctrl = require('./ctrl');
const auth = require('../../auth/auth_users');

/* GET home page. */
router.post('/getUsersInfo', auth.getJwtAuth, ctrl.getUsersInfo);
router.post('/login', ctrl.login);
router.post('/signUp', ctrl.signUp);
router.post('/setUserPw', ctrl.setUserPw);
router.post('/getAuthPhone', ctrl.getAuthPhone);

module.exports = router;
