const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getAllUsers = asyncHandler(async (req, res) => {});
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, password, email, profile } = req.body;
    if (!username || !password || !email) {
      res.status(400);
      throw new Error("please enter all the fields");
    }
    //check the existing user
    const userName = await User.findOne({ username });
    const userEmail = await User.findOne({ email });
    if (userName || userEmail) {
      res.status(403);
      throw new Error("Username or Email already exist");
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashpassword,
      profile: profile || "Hi",
    });
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = await req.body;

    if (!username || !password) {
      res.status(401);
      throw new Error("Enter username and Password");
    }

    const dbuser = await User.findOne({ username }).select("+password");
    const comparepassword = await bcrypt.compare(password, dbuser.password);
    if (!comparepassword) {
      console.log("inside the comparepassword");
      res.status(404);
      throw new Error("Incorrect Username or Password");
    }
    const accesstoken = jwt.sign(
      {
        userid: dbuser._id,
        username: dbuser.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      success: "true",
      message: "you are logged in",
      username: dbuser.username,
      accesstoken,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    res.status(400);
    throw new Error("Invalid Username");
  }
  const dbuser = await User.findOne({ username });
  if (!dbuser) {
    res.status(404);
    throw new Error(`User does not exist with username::${username}`);
  }
  if ((await req.user.username) !== dbuser.username) {
    res.status(400);
    throw new Error("You are not authorized to see this data");
  }
  res.status(200).json({
    success: true,
    message: "you can see the data",
    dbuser,
  });
});
const UpdateUser = asyncHandler(async (req, res) => {
  const newUserData = {
    username: req.body.username,
    email: req.body.email,
  };
  if (!newUserData.username || !newUserData.email) {
    res.status(400);
    throw new Error("Please enter username and email ");
  }
  const userid = await req.user.userid;
  const dbuser = await User.findByIdAndUpdate(userid, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "The data has been updated",
    dbuser,
  });
});
const generateOTP = asyncHandler(async (req, res) => {
  res.json("generateOTP");
});
const verifyOTP = asyncHandler(async (req, res) => {
  res.json("verifyOTP");
});
const createResetSession = asyncHandler(async (req, res) => {
  res.json("createResetSession");
});
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const oldpassword = await req.body.oldpassword;
    const newpassword = await req.body.newpassword;
    const hashpassword = await bcrypt.hash(newpassword, 10);
    const newUserData = {
      password: hashpassword,
    };
    console.log("1");
    if (!newpassword && !oldpassword) {
      res.status(400);
      throw new Error("Please enter the old password and the new password");
    }
    console.log("2");

    const userid = await req.user.userid;
    const user = await User.findById(userid).select("+password");
    const comparepassword = await bcrypt.compare(oldpassword, user.password);
    console.log("3");

    if (!comparepassword) {
      res.status(404);
      throw new Error("Incorrect Old Password");
    }
    console.log("4");

    const dbuser = await User.findByIdAndUpdate(userid, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log("5");

    res.status(200).json({
      success: true,
      message: "The password has been updated",
      dbuser,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  getAllUsers,
  registerUser,
  login,
  getUser,
  UpdateUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
