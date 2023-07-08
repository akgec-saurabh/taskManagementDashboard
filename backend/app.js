const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//for https
const https = require("https");
const fs = require("fs");

const taskRoutes = require("./routes/tasks-routes");
const usersRoutes = require("./routes/users-routes");
const httpError = require("./models/http-error");
const { default: mongoose } = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();

  // For pre-flight req
  if (req.method === "OPTIONS") {
    res.status(200); // Move to the next middleware for non-OPTIONS requests
  }
});

app.use(bodyParser.json());

app.use("/api/users/auth", usersRoutes);

app.use("/api/tasks", taskRoutes);

// Catching all routes that doesn't exists
app.use("/", (req, res, next) => {
  next(httpError("Could not found this route", 404));
});

// Error Middleware
app.use((error, req, res, next) => {
  if (error.headersSent) {
    return next(erorr);
  }
  res.status(error.statusCode || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

// Read the SSL certificate and key files
const options = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
  cert: fs.readFileSync(process.env.PRIVATE_CERTIFICATE_PATH),
};

// Connect

//Connecting to DataBase
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    https.createServer(options, app).listen(5000);
    console.log("Express server with HTTPS is running on port 5000");
  })
  .catch((error) => {
    console.log(error);
  });
