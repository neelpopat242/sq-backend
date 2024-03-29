const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({

  userId : {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  matches: [
    {
      email: String,
      name: String,
    },
  ],
  leftSwipe: [
    {
      email: String,
    },
  ],
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  university: {
    type: String,
  },
  bio: {
    type: String,
  },
  linkedinURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  area: {
    type: String,
  },
  experience: {
    type: Number,
  },

  projects: [
    {
      title: String,
      groupsize: Number,
      link: String,
      description: String,
      repo: String,
      mentor: String,
      duration: Number,
      frameworks: String,
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});



// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// //Password Reset
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
