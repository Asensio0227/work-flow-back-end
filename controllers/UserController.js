const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions
} = require('../utils');

const getAllUsers = async (req, res) => {
  let result = await User.find({roles:"user"}).select('-password');
  // console.log(user);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const users = await result;
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ _id: userId }).select('-password');
  // console.log(user);
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`)
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
// update user with user.save()
const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user = await User.findOne({
    _id: req.user.userId
  });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials")
  }

  user.email = email;
  user.name = name;
  await user.save();
  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser});
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please check if you entered new password")
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials")
  }

  const isPasswordCorrect = await user.ComparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid password")
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({msg:"password updated successfully!"})
};

module.exports={
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
};

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;

//   if (!name || !email) {
//     throw new CustomError.BadRequestError("Please provide all values");
//   }

//   const user = await User.findOneAndUpdate({
//     _id: req.user.userId
//   }, {
//     email,name
//   }, {
//     new: true,
//     runValidators:true
//   });

//   if (!user) {
//     throw new CustomError.UnauthenticatedError("Invalid Credentials")
//   }
//   const tokenUser = createTokenUser({ user });
//   attachCookiesToResponse({ res, user: tokenUser })
//   res.status(StatusCodes.OK).json({ user: tokenUser});
// };
