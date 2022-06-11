const mongoose = require('mongoose');





const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minilength: [3, 'Title must be at least 3 characters'],
    },

    body: {
        type: String,
                
    },

    
    likes: {
        type: Array,
        default: [],
    },
    
    answers:{
        type: mongoose.Schema.ObjectId,
        ref: 'Answer'
    },

    user: {
        type: mongoose.Schema.ObjectId,
        required: true,  
        ref: "User",

    /** Question model has a likes field. Its type is objectId and gets "User" as a reference. **/    
    },
    
        
}, {timestamps: true});



const Question = mongoose.model("question", QuestionSchema);
module.exports = Question