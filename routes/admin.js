const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CustomError = require("../errors");

const { blockUser, deleteUser } = require("../controllers/admin");

const {
  authorizePermissions,
  authenticateUser,
} = require("../middleware/authentication");

/* 
api/admin/ 
This route returns a simple message. It is open to Admin access only.
*/

router.get("/", async (req, res) => {
  const { admin } = req.admin.user;
  const adminUser = await User.findOne({ admin });

  if (!adminUser) {
    throw new CustomError.BadRequestError("Admin page for only admins.");
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Welcome Admin",
  });
});

router.route(
  "/block/:id",
  blockUser,
  authenticateUser,
  authorizePermissions("admin")
);

router.route(
  "/delete/:id",
  deleteUser,
  authenticateUser,
  authorizePermissions("admin")
);

module.exports = router;
