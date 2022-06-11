const User = require('../models/User');

const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');



const getAllUsers = async (req, res) => {
    const users = await User.find();

    res.status(StatusCodes.OK).json({
        success: true,
        data: users,
    });
}


const getSingleUser = async (req, res) => { 
    
    const {id} = req.params;
    const user = await User.findById(id);

    return res.status(StatusCodes.OK).json({
        data: user,
    })


}

module.exports = {
    getAllUsers,
    getSingleUser
}