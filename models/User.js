const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Question = require('./Question');
const validator = require('validator');



const UserSchema = new mongoose.Schema({


    name: {
        type: String,
        },

    email: {
        type: String,
        
        
    },


    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    password: {
        type: String,
        select: false,
        
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


const User = mongoose.model("user", UserSchema);
module.exports = User;
    