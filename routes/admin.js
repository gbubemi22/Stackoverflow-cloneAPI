const express = require('express');
const router = express.Router();


const {
    blockUser ,
    deleteUser,
 } = require('../controllers/admin'); 




router.route('/block/:id', blockUser)


router.route('/delete/:id', deleteUser)

module.exports = router;
