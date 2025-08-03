const express = require("express");
const router = express.Router();
const {SignupValidation,LoginValidation} = require("../Middlewares/Validation")
const {Signup,Login} = require("../Controllers/UserModel")




router.post("/signup",SignupValidation,Signup);
router.post("/login",LoginValidation,Login);

module.exports = router;