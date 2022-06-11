const express = require('express');
const router = express.Router();

const { AskQuestion,
     getSingleQuestion,
      getAllQuestions,
       updateQustion,
        deleteQuestion,
        likeQuestion,
     undoLikeQuestion

     } = require('../controllers/question');

const {
          authenticateUser,
          } = require('../middleware/authentication');


router.route('/')
.post(AskQuestion,(authenticateUser))
.get(getAllQuestions)



router.route('/:id')
.get(getSingleQuestion)
.patch(updateQustion, (authenticateUser))
.delete(deleteQuestion, (authenticateUser))

router.route('/:id/like')
.get(likeQuestion, (authenticateUser))


router.route('/:id/unlike')
.get(undoLikeQuestion, (authenticateUser))

module.exports = router;