const User = require('../models/User');
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const sendMail = require('../utils/sendEMail');
const bcrypt = require('bcryptjs');



const register = async (req , res) => {
   const { name, email, password } = req.body;

    const  emailAlreadyExists = await User.findOne({ email });
   if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }
    
   const isFirstAccount = (await User.countDocuments({})) === 0;
     const role = isFirstAccount ?'admin' : 'user';

  
    const user = await User.create({ name, email, password, role });
    
    
   const tokenUser = createTokenUser(user);
   attachCookiesToResponse({ res, user: tokenUser });

   res.status(StatusCodes.CREATED).json({ user: tokenUser , user });

   

 }


const login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      throw new CustomError.BadRequestError('Please provide username and password');
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
  
    res.status(StatusCodes.OK).json({ user: tokenUser });
  };
  
  
  
  const logout = async (req, res) => {

    
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
      secure: NODE_ENV === "develpoment" ? false : true,
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
  };


  const userProfile = async (req, res) => {
    const userId = req.user.id
    const user = await User.findById(userId);

    res.status(StatusCodes.OK).json({ user });
  } 

  const imageUpload = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.id, {
        profile_image: req.savedProfileImage
    }, {
        new: true,
        runValidators: true,
    });

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Image Upload Succesfull",
        data: user 
    })
  } ; 


const updateUser = async (req, res) =>{
  const updateInfo = req.body;
  const userId = req.user.id;
  if(!userId) {
    throw new CustomError.BadRequestError('User not found');
  }
  const user = await User.findByIdAndUpdate(req.user.id, updateInfo, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  })
}



const forgotPassword = async (req, res, next) => {

  const resetEmail = req.body.email;
  const user = await User.findOne({email: resetEmail});

  if (!user) {
      return next(new CustomError.BAD_REQUEST("User Not Found With That Email"));

  }
  const resetPasswordToken = user.getResetPasswordToken();

  await user.save();
  
  const resetPasswordUrl = `http://localhost:7005/api/v1/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = `
      <h3>Reset Your Password</h3>
      <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
      
  `;
  try {
      await sendMail({
          from: process.env.SMTP_EMAIL, 
          to: resetEmail, 
          subject: "Reset Password Token",
          html: emailTemplate
      });
      
      /* JSON information */
      return res.status(StatusCodes.OK)
      .json({
          success : true,
          message : "Email Sent To Your Email",
      });
  }
  catch(err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      user.save();

      return next(new CustomError.INTERNAL_SERVER_ERROR("Email Could Not Be Sent"));
  }    
};



/* Reset Password Controller */
const resetPassword =  async (req, res, next) => {
        
  const {resetPasswordToken} = req.query;

  const {password} = req.body;

  if (!resetPassword) {
      return next(new CustomError.BAD_REQUEST("Please provide a valid token"));
  };

  let user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now()}
  });

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  /* JSON information */
  res.status(StatusCodes.OK).json({
      success: true,
      message: "Reset Password Process Successfull"
  })

};

  
  
  module.exports = {
    register,
    login,
    logout,
    userProfile,
    imageUpload,
    updateUser,
    forgotPassword,
    resetPassword,

  }
