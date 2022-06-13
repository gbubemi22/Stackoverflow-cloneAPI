const { StatusCodes } = require("http-status-codes");
const Customerror = require("../errors");
const Question = require("../models/Question");

const AskQuestion = async (req, res) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: question,
  });
};

const getSingleQuestion = async (req, res) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question) {
    throw Customerror.NotFoundError(`No Question with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({
    sucess: true,
    data: question,
  });
};

const getAllQuestions = async (req, res) => {
  const questions = await Question.find();

  res.status(StatusCodes.OK).json({
    success: true,
    data: questions,
  });
};

const updateQustion = async (req, res) => {
  const { id: questionId } = req.params;

  const question = await Question.findOneAndUpdate(
    {
      _id: questionId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!question) {
    throw new CustomError.NotFoundError(`No Question with id : ${questionId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: question,
  });
};

const deleteQuestion = async (req, res) => {
  const { id: questionId } = req.params;

  const question = await Question.findOne({ _id: questionId });

  if (!question) {
    throw new CustomError.NotFoundError(`No question with id: ${questionId}`);
  }

  await question.remove();

  res.status(StatusCodes.OK).json({
    message: "Question Deleted",
  });
};

const likeQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);

  if (question.likes.includes(req.user.id)) {
    throw new CustomError.BadRequestError(`You already liked this question`);
  }
  question.likes.push(req.user.id);

  await question.save();

  return res.status(StatusCodes.OK).json({
    message: "Question liked",
  });
};

const undoLikeQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);

  if (!question.likes.includes(req.user.id)) {
    throw new CustomError.BadRequestError(`You have not liked this question`);
  }

  const index = question.likes.indexOf(req.user.id);

  question.likes.splice(index, 1);

  await question.save();

  return res.status(StatusCodes.OK).json({
    message: "Question unliked",
  });
};

module.exports = {
  AskQuestion,
  getSingleQuestion,
  getAllQuestions,
  updateQustion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
};
