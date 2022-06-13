const express = require("express");
const router = express.Router();

const {
  addAnswerToQuestion,
  likeAnswer,
  getSingleAnswer,
  getAllAnswersByQuestion,
  updateAnswer,
  deleteAnswer,
  undoLikeAnswer,
} = require("../controllers/answer");

const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .post(addAnswerToQuestion, authenticateUser)
  .get(getAllAnswersByQuestion);

router
  .route("/:id")
  .get(getSingleAnswer)
  .patch(updateAnswer, authenticateUser)
  .delete(deleteAnswer, authenticateUser);

router.route("/:answerId/like").get(likeAnswer, authenticateUser);

router.route("/:answerId/unlike").get(undoLikeAnswer, authenticateUser);

module.exports = router;
