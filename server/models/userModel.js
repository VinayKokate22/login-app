const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide unique username"],
    unique: [true, "Username Exist"],
    maxlength: [40, "Name should not exceed more than 30 char"],
    minlength: [4, "Name should be atleast 4 char"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: [8, "password should be atleast 8 char"],
    select: false,
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  profile: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
