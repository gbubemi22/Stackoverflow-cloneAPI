const Qestion = require('../models/Question');
const Answer  = require('../models/Answer');
const { CustomError } = require("../errors");
const  { StatusCodes } = require("http-status-codes");



const addAnswerToQuestion = async (req, res) => {
    const { id: questionId } = req.params;

    const user_id = req.user.id;

    const information = req.body;

    const answer =  await Qestion.create({
        ...information,
         question: questionId,
         user: user_id
        
    });

    res.status(StatusCodes.CREATED).json({
        success: true,
        data: answer,
    });
}
 

const getSingleAnswer = async (req, res) => {
    const { id} = req.params;
    
    const answer = await Answer.findById(id)
    .populate({path: 'user', select: "title"})
    .populate({path: 'name profile_image'});
    
     if(!answer) {
        throw Customerror.NotFoundError(`No Answer with id: ${id}`);
     }
     res.status(StatusCodes.OK).json({
         sucess: true,
         data: answer,
    });
    
    
    }
    
    
    const getAllAnswersByQuestion = async (req, res) => {
        const answer = await Answer.find();
    
        res.status(StatusCodes.OK).json({
            success: true,
            data: answer,
        });
    }
    
    
    const updateAnswer = async (req, res) => {
       
       const {id: answerId} = req.params;
       
           
       
       const answer = await Question.findOneAndUpdate({
         _id: answerId
         },
          req.body, {
        new: true,
        runValidators: true,
      });
    
      if (!answer) {
        throw new CustomError.NotFoundError(`No Answer with id : ${answerId}`);
      }
    
      res.status(StatusCodes.OK).json({
         success: true,
        data: answer,
     });
    
       
       
    }
    
    const deleteAnswer = async (req, res) => {
        const  { id: answerId } = req.params;
        
    
        const answer = await Answer.findOne({ _id: answerId });
        
    
        if(!answer) {
            throw new CustomError.NotFoundError(`No Answer with id: ${answerId}`);
        }
         
        await answer.remove();
    
        res.status(StatusCodes.OK).json({
            message: "Answer Deleted",
        });
    }
    
    const likeAnswer = async (req, res) => {
      const {id} = req.params ;
      const answer = await Question.findById(id);
    
      if(answer.likes.includes(req.user.id)){
        throw new CustomError.BadRequestError(`You already liked this question`);
      }
      answer.likes.push(req.user.id);
    
      await answer.save();
    
      return res.status(StatusCodes.OK).json({
        message: "Liked",
      });
    
    };
    
    
    
    const undoLikeAnswer = async (req, res) => {
        const {id} = req.params ;
        const answer = await Answer.findById(id);
    
        if(!answer.likes.includes(req.user.id)){
            throw new CustomError.BadRequestError(`You have not liked this answer`);
        }
    
        const index = answer.likes.indexOf(req.user.id);
    
        answer.likes.splice(index, 1);
    
        await answer.save()
    
        return res.status(StatusCodes.OK).json({
            message: "Question unliked",
        })
    
    }


    module.exports = {
        addAnswerToQuestion,
        likeAnswer,
        getSingleAnswer,
        getAllAnswersByQuestion,
        updateAnswer,
        deleteAnswer,
        undoLikeAnswer,
    }
    