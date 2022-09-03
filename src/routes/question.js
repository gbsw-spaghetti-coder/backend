const express = require('express');
const router = express.Router();

const controller = require('../controller/question');

const { isLoggedIn } = require('../utils/middlewares');

router.get('/:id', controller.getQuestion);
router.get('/', controller.getQuestions);
router.post('/', isLoggedIn, controller.createQuestion);
router.delete('/:id', isLoggedIn, controller.delete);

module.exports = router;