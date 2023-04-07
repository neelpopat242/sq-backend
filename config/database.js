const mongoose = require("mongoose");
require('dotenv').config({path:"./etc/secrets/.env"})
console.log(process.env.DB_HOST, "URL in db.js")
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

module.exports = connectDatabase;
