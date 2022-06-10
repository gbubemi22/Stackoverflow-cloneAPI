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




router.route('/')
.post(AskQuestion)
.get(getAllQuestions)



router.route('/:id')
.get(getSingleQuestion)
.patch(updateQustion)
.delete(deleteQuestion)

router.route('/:id/like')
.get(likeQuestion)


router.route('/:id/unlike')
.get(undoLikeQuestion)

module.exports = router;