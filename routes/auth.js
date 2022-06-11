const express = require('express');
const router = express.Router();
const profileImageUpload = require('../utils/profileImageUpload');

const {
    userProfile,
    imageUpload,
    register,
    login,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
    
  } = require("../controllers/auth");

  const {
    authenticateUser,
    authorizePermissions
    } = require('../middleware/authentication');

  router.post('/register', register);
  router.post('/login', login);
  router.get('logout', logout);
  router.get('/profile',(authenticateUser),userProfile);

  router.put('/userUpdate', updateUser)

  router.patch('/forgetpassword', forgotPassword)
  router.patch('/resetpassword', resetPassword)


  router.post('/upload', [profileImageUpload.single("profile_image")],(authenticateUser),imageUpload)


module.exports = router;