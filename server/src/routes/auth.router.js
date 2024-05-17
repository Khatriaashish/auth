const authCtrl = require("../controllers/auth.controller");
const uploader = require("../middlewares/uploader.middleware");
const validateRequest = require("../middlewares/validate-request.middleware");
const { signUpSchema } = require("../validators/auth.validator");
const router = require("express").Router();

const dirSetup = (req, res, next) => {
  req.uploadDir = "public/uploads/users";
  next();
};
router.post(
  "/signup",
  dirSetup,
  uploader.single("image"),
  validateRequest(signUpSchema),
  authCtrl.signup
);

module.exports = router;
