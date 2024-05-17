const express = require("express");
const cors = require("cors");
const { MulterError } = require("multer");
const { ZodError } = require("zod");

//module routes
const authRouter = require("../routes/auth.router");

require("./db.config");
const app = express();

//cross origin resolve
app.use(cors());

//bodyparser
app.use(express.json());

//static serving for localhost
app.use("/asset", express.static("public/uploads"));

//health-check
app.get("/health", (req, res) => {
  res.end("App is running well");
});

//api
app.use("/api/auth", authRouter);

//route not found handler
app.use((req, res) => {
  res.status(404).json({
    result: null,
    message: "Requested Route not found",
    meta: null,
  });
});

//other exception handler
app.use((error, req, res, next) => {
  let result = error.result ?? null;
  let code = error.code ?? 500;
  let message = error.message ?? "Server error";

  //multer file size error handle
  if (error instanceof MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      code = 400;
      message = error.message;
    }
  }

  //zod error message customization
  if (error instanceof ZodError) {
    code = 400;
    msg = {};

    error.errors.map((err) => (msg[err.path[0]] = err.message));

    message = "Validation failure";
    result = msg;
  }

  //mongodb unique key error handle
  if (error.code === 11000) {
    code = 400;
    let uniqueKeys = Object.keys(error.keyPattern);
    let msgBody = uniqueKeys.map((key) => {
      return {
        [key]: key + " is already registered",
      };
    });
    result = msgBody;
    message = "Validation Fail";
  }

  res.status(code).json({
    result: result,
    message: message,
    meta: null,
  });
});

module.exports = app;
