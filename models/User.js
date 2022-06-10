const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Question = require('./Question');
const validator = require('validator');



const UserSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        validate: {
        validator: validator.isEmail,
         message: 'Please provide valid email',
    },
},

    role: {
        type: string,
        default: "user",
        enum: ["user", "admin"],
    },

    password: {
        type: String,
        select: false,
        required: [true, 'Please provide password'],
    },
    profile_image: {
        type: String,
        default:false,
    },

    blocked: {
        type: Boolean,
        default: false,
    },


}, { timestamps: true }); 


UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
  UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };



    /* After the user is deleted, it also deletes the user's questions. */
    UserSchema.post("remove", async function(){
        await Question.deleteMany({
          user: this._id
        }) 
    });

    /* After the user is deleted, it also deletes the user's questions. */
UserSchema.post("remove", async function(){
    await Question.deleteMany({
      user: this._id
    }) 
});




const User = mongoose.model("user", UserSchema);
module.exports = User;
    