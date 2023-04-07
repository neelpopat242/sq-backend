const express = require("express")
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser());
app.use(cors())

const user = require("./routes/userRoute");

app.use("/api/v1", user);

module.exports = app;