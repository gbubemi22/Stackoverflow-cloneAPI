const express = require('express');
const router = express.Router();
require('express-async-errors');


const questions = require('./question');
const answer = require('./answer');
const user = require('./user');
const admin = require('./admin');
const auth = require('./auth');




//api/v1/question
router.use('/questions', questions);

//api/v1/answer
router.use('/answer', answer);

//api/v1/users
router.use('/users',  user);

//api/v1/admin
router.use('/admin', admin);

//api/v1/auth
router.use('/auth', auth);


module.exports = router;