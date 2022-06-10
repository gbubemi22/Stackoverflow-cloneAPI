const express = require('express');
const router = express.Router();



const {
    addAnswerToQuestion,
    likeAnswer,
    getSingleAnswer,
    getAllAnswersByQuestion,
    updateAnswer,
    deleteAnswer,
    undoLikeAnswer,
} = require('../controllers/answer');



router
.route('/')
.post(addAnswerToQuestion)
.get(getAllAnswersByQuestion)


router.route('/:id')
.get(getSingleAnswer)
.patch(updateAnswer)
.delete(deleteAnswer)


router.route('/:answerId/like')
.get(likeAnswer)


router.route('/:answerId/unlike')
.get(undoLikeAnswer)

module.exports = router;