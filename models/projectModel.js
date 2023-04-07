const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectId: { type: String },
  title: { type: String },
  groupsize: { type: Number },
  link: { type: String },
  description: { type: String },
  repo: { type: String },
  mentor: { type: String },
  duration: { type: Number },
  frameworks: { type: String },
  userId: {type: String},
});

module.exports=mongoose.model('projects',projectSchema)