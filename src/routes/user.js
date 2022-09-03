const express = require('express');
const router = express.Router();

const controller = require('../controller/user');

const { isLoggedIn } = require('../utils/middlewares');

router.get('/', isLoggedIn, controller.getMyData);
router.patch('/introduce', isLoggedIn, controller.updateMyIntroduce);

module.exports = router;