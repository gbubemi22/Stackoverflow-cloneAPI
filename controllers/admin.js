const User = require('../models/User');
const Customerror = require('../errors');
const StatusCodes = require('http-status-codes');


const blockUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    user.block = !user.blocked;

    await user.save();

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Blocked User",
    });     

};


const deleteUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    await user.romove()

    return res.status(StatusCodes.OK).json({
        message: "User Deleted",
    });
};


module.exports = {
    blockUser ,
    deleteUser, 
}
