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
  res.json("UpdateUser");
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
  res.json("resetPassword");
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
