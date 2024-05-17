const generateRandomString = (len = 100) => {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = "";
  for (let i = 1; i <= len; i++) {
    let pos = Math.floor(Math.random() * (chars.length - 1));
    random += chars[pos];
  }
  return random;
};

module.exports = { generateRandomString };
