const express = require('express');
const router = express.Router();

const controller = require('../controller/question');

const { isLoggedIn } = require('../middlewares/authorization');

const { postUploader }  = require('../middlewares/uploader');

router.get('/:id', controller.getQuestion);
router.get('/search/:search', controller.search);
router.get('/', controller.getQuestions);
router.get('/category/:category', controller.getCategory);
router.post('/', isLoggedIn, postUploader.array('img'), controller.createQuestion);
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