const express = require('express');
const router = express.Router();

const controller = require('../controller/user');

const { isLoggedIn } = require('../utils/middlewares');
const { profileUploader } = require('../utils/uploader');

router.get('/', isLoggedIn, controller.getMyData);
router.post('/info', isLoggedIn, profileUploader.single('img'),  controller.updateInfo);
router.post('/password', isLoggedIn, controller.updatePassword);

module.exports = router;