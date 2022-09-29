const express = require('express');
const router = express.Router();

const controller = require('../controller/question');

const { isLoggedIn } = require('../utils/middlewares');

const { profileUploader } = require('../utils/uploader');

router.get('/:id', controller.getQuestion);
router.get('/', controller.getQuestions);
router.get('/search', controller.searchQuestion);
router.post('/', isLoggedIn, controller.createQuestion);
router.delete('/:id', isLoggedIn, controller.deleteQuestion);
router.get('/good/:id', isLoggedIn, controller.goodQuestion);
router.get('/bad/:id', isLoggedIn, controller.badQuestion);


/*router.post('/image', profileUploader.single('image'), (req, res) => {
  console.log(req.file);
  console.log(req.body)
  try {
    res.status(200).json(req.file);
  } catch(error) {
    console.error(error);
  }
})*/

module.exports = router;