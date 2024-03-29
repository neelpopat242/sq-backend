const ErrorHander = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const projectModel = require("../models/projectModel");
const { v4: uuidv4 } = require("uuid");
const { createToken } = require("../utils/createToken");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  const token = createToken(email);
  res.status(200).json({
    success: true,
    token,
  });
});

//UserDetails put request
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const { email, token } = req.body;
  const user = await User.findOne({ email });

  const update = req.body;
  const opts = { new: true };

  let doc = await User.findOneAndUpdate({ email }, update, opts);
  res.send({
    success: true,
    email,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Please enter valid email or password"), 401);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const token = createToken(email);
  res.status(200).json({
    success: true,
    token,
  });
});

// Logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
  // res.cookie("token", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  // });
  res.clearCookie("token");
  res.clearCookie("email");

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  await user.save({ validateBeforeSave: false });
});

exports.userInfo = catchAsyncErrors(async (req, res, next) => {
  const email = req.query.email;
  const user = await User.findOne({ email });
  res.send(user);
});

// Swipe right and add match
exports.addMatch = catchAsyncErrors(async (req, res, next) => {
  const { email, matchedEmail } = req.body;
  const query = { email: email };
  const matchedUser = await User.findOne({ email: matchedEmail });

  const updateMatch = {
    $push: { matches: { email: matchedEmail, name: matchedUser.name } }, // adding name to display on dashboard- matches list
    // $push : {acceptedmatches : {email: matchedEmail, name:matchedUser.name }},
  };

  const user = await User.updateOne(query, updateMatch);
  res.json(user);
});

// Matchuser list

exports.getMatchedUser = catchAsyncErrors(async (req, res, next) => {
  const emails = JSON.parse(req.query.emails);

  const pipeline = [
    {
      $match: {
        email: {
          $in: emails,
        },
      },
    },
  ];

  const foundUsers = await User.aggregate(pipeline);
  res.json(foundUsers);
});

// Swipe left and remove from users list
exports.leftSwipe = catchAsyncErrors(async (req, res, next) => {
  const { email, leftSwipeEmail } = req.body;
  const query = { email: email };
  const updateMatch = {
    $push: { leftSwipe: { email: leftSwipeEmail } },
  };

  const user = await User.updateOne(query, updateMatch);
  res.json(user);
});

// display all users on dashboard
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

// Get Messages by from_userId and to_userId

exports.getMessage = catchAsyncErrors(async (req, res, next) => {
  const from_email = req.query.from_email;
  const to_email = req.query.to_email;

  const query = {
    from_email: from_email,
    to_email: to_email,
  };

  const foundMessages = await Message.find(query);
  res.send(foundMessages);
});

// Add a Message to our Database

exports.addMessage = catchAsyncErrors(async (req, res, next) => {
  const { from_email, to_email, message, timestamp } = req.body;
  const insertedMessage = await Message.create({
    from_email,
    to_email,
    message,
    timestamp,
  });
  res.send(insertedMessage);
});

//put image in database
exports.getimage = catchAsyncErrors(async (req, res, next) => {
  const { email, token } = req.body;
  const user = await User.findOne({ email });

  // if(!email || !password){
  //   return next(new ErrorHander("Please Enter Email and Password",400))

  const update = { avatar: req.body.avatar };
  const opts = { new: true };

  let doc = await User.findOneAndUpdate({ email }, update, opts);
  res.send({
    success: true,
    email,
  });
});
