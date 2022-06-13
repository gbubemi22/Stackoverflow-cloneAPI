require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyparser = require("body-parser");
//const mongoSanitize = require('express-mongo-sanitize');
const path = require("path");
const routers = require("./routes/index");
const responseTime = require("response-time");
const cookieParser = require("cookie-parser");
//const catchValue = require('./middleware/redis');

// database
const connectDB = require("./DB/connect");

app.use(responseTime());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECT));
app.use(express.static(path.join(__dirname, "public"))); // Static files.

//app.use(mongoSanitize());

//errorHandlerMiddleware
const notFoundMiddleware = require("./middleware/not-Found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// "localhost:PORT/" endpoint
app.get("/", (req, res) => {
  res.send("Stackoverflow back end clone with Node.js.");
});

//Routes
app.use("/api/v1/", routers);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//port
port = process.env.PORT || 7005;

//server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listing on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
