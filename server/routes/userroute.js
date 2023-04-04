const express = require("express");
const {
  getAllUsers,
  registerUser,
  login,
  getUser,
  verifyOTP,
  createResetSession,
  UpdateUser,
  resetPassword,
} = require("../controllers/userController");
const verify = require("../middleware/auth");
const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/registermail").post();
router.route("/authenticate").post((req, res) => {
  res.end();
});
router.route("/login").post(login);
router.route("/user/:username").get(verify, getUser);
router.route("/verifyOTP").get(verifyOTP);
router.route("/createResetSession").get(createResetSession);
router.route("/updateuser").put(verify, UpdateUser);
router.route("/resetPassword").put(verify, resetPassword);
module.exports = router;
