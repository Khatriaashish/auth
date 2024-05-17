const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODEB_NAME,
    autoCreate: true,
    autoIndex: true,
  })
  .then((success) => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to database");
    process.exit(0);
  });
