const express = require("express");
const router = express.Router();
const controller = require("../controller/usercontroller");


router.post("/request-otp", controller.requestOtp);
router.post("/verify-otp", controller.verifyOtp);
router.get("/me", controller.getMe);

module.exports = router;
