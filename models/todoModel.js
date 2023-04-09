const mongoose = require("mongoose");

const todoschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("todo", todoschema);
