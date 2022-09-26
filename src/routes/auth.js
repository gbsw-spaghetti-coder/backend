const express = require('express');
const router = express.Router();

const controller = require('../controller/auth');
const validator = require('../controller/validate');

const { isLoggedIn, isNotLoggedIn } = require('../utils/middlewares');


router.post('/sign', isNotLoggedIn, controller.sign);
router.post('/login', isNotLoggedIn, controller.login);
router.get('/logout', isLoggedIn, controller.logout);

router.post('/email', isNotLoggedIn, validator.isExistEmail);
router.post('/nick', isNotLoggedIn, validator.isExistNick);

module.exports = router;