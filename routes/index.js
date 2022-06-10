const express = require('express');
const router = express.Router();


const questions = require('./question');
const answer = require('./answer');



//api/question
router.use('/questions', questions);

//api/answer
router.use('/answer', answer);


module.exports = router;