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
    
    // answers:{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Answer'
    // },

    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     required: true,  
    //     ref: "User",

    // /** Question model has a likes field. Its type is objectId and gets "User" as a reference. **/    
    // },
    
        
}, {timestamps: true});

// QuestionSchema.pre("save", function(next){
       
//     /*If the title information has not changed, it continues without running the following function.*/
//     if(!this.isModified("title")){
//         next();
//     }

//     /* Creates a slug. */
//     this.slug = this.makeSlug();
//     next();

// });

// /* The slug function was written as a method.*/
// QuestionSchema.methods.makeSlug = function() {
//  /* "slugify" creates a slug from the string information it contains.*/
//  return slugify(this.title, { 
//      replacement: '-', // "-"" will include.
//      remove: /[*+~.()'"!:@]/g,  // A regular expression that specifies characters that will not be in the slug field.
//      lower: true, // Converts all characters to lowercase characters.
//  });
// };

const Question = mongoose.model("question", QuestionSchema);
module.exports = Question