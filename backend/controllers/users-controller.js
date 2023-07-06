const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const httpError = require("../models/http-error");
const User = require("../models/user");

const signupUser = async (req, res, next) => {
  // Express Validator Validating
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(httpError("Some Error Occured", 422));
  }

  const { name, email, password, role } = req.body;

  // Checking if User Exist Already
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next("Some Error Occured while finding User", 500);
  }

  if (existingUser) {
    return next(httpError("User Exist Already", 422));
  }

  let hashPassword;
  try {
    hashPassword = await bcryptjs.hash(password, 12);
  } catch (error) {
    return next(httpError("Some Error Occured, Please try agian", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashPassword,
    role,
    assignedTasks: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(httpError("SignUp Failed, please try again", 500));
  }

  //Creating json web token while SignUp
  let token;
  try {
    token = jwt.sign(
      { id: createdUser.id, email: createdUser.email },
      "Super_secret_key",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(httpError("SignUp Failed, please try again", 500));
  }

  // Sending response with token when everything goes good
  res.status(201).json({
    message: "SignUp Successfull",
    userId: createdUser.id,
    userEmail: createdUser.email,
    token: token,
  });
};

//For Sign-in
const signinUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if User Exist
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(httpError("Some Error Occured while finding User", 500));
  }

  if (!existingUser) {
    return next(httpError("Could not signin User doesn't exist", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcryptjs.compare(password, existingUser.password);
  } catch (error) {
    return next(
      httpError("Some Error occured, please check your credentials", 500)
    );
  }

  // password is not same
  if (!isValidPassword) {
    return next(httpError("Please check your credentials"), 401);
  }

  //Creating json web token while signIn
  let token;
  try {
    token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      "Super_secret_key",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(httpError("SignIn Failed, please try again", 500));
  }

  res.status(200).json({
    message: "Signin Successfull",
    userId: existingUser.id,
    userEmail: existingUser.email,
    token: token,
  });
};

exports.signupUser = signupUser;
exports.signinUser = signinUser;
