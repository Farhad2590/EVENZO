const {
  signup,
  signin,
  getUserById,
  logout,
} = require("../Controllers/AuthController");
const {
  signupValidation,
  signinValidation,
} = require("../Middlewares/AuthValidation");
const router = require("express").Router();

router.post("/signin", signinValidation, signin);

router.post("/signup", signupValidation, signup);

router.get("/user/:id", getUserById);

router.post("/logout", logout);

module.exports = router;
