const multer = require("multer");
const fs = require("fs");

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = req.uploadDir ?? "./public/uploads/others";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let random = Math.ceil(Math.random() * 9999);
    let ext = file.originalname.split(".").pop();
    let filename = Date.now() + "_" + random + "." + ext;
    cb(null, filename);
  },
});

const imageFilter = (req, file, cb) => {
  let ext = file.originalname.split(".").pop();
  let allowed = ["jpg", "png", "jpeg", "svg", "bmp", "webp"];

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb({ code: 400, message: "File format not supported" }, null);
  }
};

const uploader = multer({
  storage: myStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 3000000,
  },
});

module.exports = uploader;
