const authCtrl = require("../controllers/auth.controller");
const CheckLogin = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/uploader.middleware");
const validateRequest = require("../middlewares/validate-request.middleware");
const {
  signUpSchema,
  setPasswordSchema,
  loginSchema,
} = require("../validators/auth.validator");
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

router.get("/verify-token/:token", authCtrl.verifyToken);

router.post(
  "/set-password/:token",
  validateRequest(setPasswordSchema),
  authCtrl.setPassword
);

router.post("/login", validateRequest(loginSchema), authCtrl.login);

router.get("/profile", CheckLogin, authCtrl.getLoggedInUser);

module.exports = router;
