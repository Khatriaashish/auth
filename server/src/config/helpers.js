const fs = require("fs");

const generateRandomString = (len = 100) => {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = "";
  for (let i = 1; i <= len; i++) {
    let pos = Math.floor(Math.random() * (chars.length - 1));
    random += chars[pos];
  }
  return random;
};

const getTokenFromHeaders = (req) => {
  let token = null;

  if (req.headers["authorization"]) token = req.headers["authorization"];

  if (req.headers["x-xsrf-token"]) token = req.headers["x-xsrf-token"];

  if (req.query["token"]) token = req.query["token"];

  return token;
};

const deleteFile = (path, filename) => {
  if (fs.existsSync(path + filename)) fs.unlinkSync(path + filename);
};

module.exports = { generateRandomString, getTokenFromHeaders, deleteFile };
