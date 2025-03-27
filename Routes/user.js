const express = require("express");
const router = express.Router();
const {
  HandleUserSignup,
  HandleUserLogin,
  HandleUserOTP,
  HandleVerifyOTP,
} = require("../Controllers/user");

router.post("/", HandleUserSignup);
router.post("/login", HandleUserLogin);
router.post("/forgetPassword", HandleUserOTP);
router.post("/VerifyOTP", HandleVerifyOTP);

module.exports = router;
