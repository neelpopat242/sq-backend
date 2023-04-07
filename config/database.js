const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config({path:"./etc/secrets/.env"})
console.log(process.env.DB_URL)
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

module.exports = connectDatabase;
