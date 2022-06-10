const mongoose = require('mongoose')


const AnswerSchema = new mongoose.Schema({

    body: {
        type: String,
        
    },

    likes: {
        types: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            }
        ]
    },

    user: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true, 
        }
    ],

    question: {
        type: mongoose.Schema.ObjectId,
        ref: "Question",
        required: true,
    },
})



const Answer = mongoose.model("answer", AnswerSchema);
module.exports = Answer
    