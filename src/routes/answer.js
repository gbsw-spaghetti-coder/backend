const express = require('express');
const router = express.Router();

const controller = require('../controller/answer')

const { isLoggedIn } = require('../middlewares/authorization');

router.get('/:id', controller.getAnswer);
router.post('/:id', isLoggedIn, controller.createAnswer);
router.delete('/:id', isLoggedIn, controller.deleteAnswer);
router.get('/selection/:id', isLoggedIn, controller.selection);


module.exports = router;