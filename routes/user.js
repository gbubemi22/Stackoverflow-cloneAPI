const express = require('express');
const router = express.Router();


const {getAllUsers, getSingleUser } = require('../controllers/user');



router.get('/', getAllUsers)
router.get('/:id', getSingleUser)


module.exports = router;
