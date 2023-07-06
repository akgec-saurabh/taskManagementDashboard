const express = require("express");
const { signupUser, signinUser } = require("../controllers/users-controller");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("name").notEmpty().isLength({ min: 5 }),
    check("password").isLength({ min: 5 }),
  ],
  signupUser
);

router.post(
  "/signin",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  signinUser
);

module.exports = router;
