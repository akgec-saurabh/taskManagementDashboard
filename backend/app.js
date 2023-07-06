const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const taskRoutes = require("./routes/tasks-routes");
const usersRoutes = require("./routes/users-routes");
const httpError = require("./models/http-error");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

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

//Connecting to DataBase
mongoose
  .connect(
    "mongodb+srv://akgecsaurabh:cOQzpTlYTXodFqf8@cluster0.swtdgbn.mongodb.net/"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
