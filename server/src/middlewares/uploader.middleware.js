//cloudinary
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => req.uploadDir ?? "uploads/others",
    format: async (req, file) => {
      const ext = file.originalname.split(".").pop();
      return ext; // Use the original file extension
    },
    public_id: (req, file) => {
      const random = Math.ceil(Math.random() * 9999);
      const ext = file.originalname.split(".").pop();
      const filename = Date.now() + "_" + random + "." + ext;
      return filename;
    },
  },
});

const imageFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop().toLowerCase();
  const allowed = ["jpg", "png", "jpeg", "svg", "bmp", "webp"];

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb({ code: 400, message: "File format not supported" }, false);
  }
};

const uploader = multer({
  storage: cloudinaryStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 3000000, // 3 MB
  },
});

module.exports = { uploader, cloudinary };

// const multer = require("multer");
// const fs = require("fs");

// const myStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let path = req.uploadDir ?? "./public/uploads/others";
//     if (!fs.existsSync(path)) {
//       fs.mkdirSync(path, { recursive: true });
//     }
//     cb(null, path);
//   },
//   filename: (req, file, cb) => {
//     let random = Math.ceil(Math.random() * 9999);
//     let ext = file.originalname.split(".").pop();
//     let filename = Date.now() + "_" + random + "." + ext;
//     cb(null, filename);
//   },
// });

// const imageFilter = (req, file, cb) => {
//   let ext = file.originalname.split(".").pop();
//   let allowed = ["jpg", "png", "jpeg", "svg", "bmp", "webp"];

//   if (allowed.includes(ext)) {
//     cb(null, true);
//   } else {
//     cb({ code: 400, message: "File format not supported" }, null);
//   }
// };

// const uploader = multer({
//   storage: myStorage,
//   fileFilter: imageFilter,
//   limits: {
//     fileSize: 3000000,
//   },
// });

// module.exports = uploader;
