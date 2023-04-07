const mongoose = require("mongoose");
dotenv.config({path:"./etc/secrets/.env"})
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
