const authCtrl = require("../controllers/auth.controller");
const CheckLogin = require("../middlewares/auth.middleware");
const CheckPermission = require("../middlewares/rbac.middleware");
const { uploader } = require("../middlewares/uploader.middleware");
const validateRequest = require("../middlewares/validate-request.middleware");
const {
  signUpSchema,
  setPasswordSchema,
  loginSchema,
  emailValidationSchema,
  updateUserSchema,
} = require("../validators/auth.validator");
const router = require("express").Router();

const dirSetup = (req, res, next) => {
  req.uploadDir = "public/uploads/users";
  next();
};

//registration
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

//login
router.post("/login", validateRequest(loginSchema), authCtrl.login);

//user CRUD
router
  .route("/profile")
  .get(CheckLogin, authCtrl.getLoggedInUser)
  .put(
    CheckLogin,
    dirSetup,
    uploader.single("image"),
    validateRequest(updateUserSchema),
    authCtrl.updateUser
  )
  .delete(CheckLogin, authCtrl.deleteUser);

router.get(
  "/users",
  CheckLogin,
  CheckPermission("admin"),
  authCtrl.getAllUsers
);

//password reset
router.post(
  "/forget-password",
  validateRequest(emailValidationSchema),
  authCtrl.forgetPassword
);

router.post(
  "/reset-password/:resetToken",
  validateRequest(setPasswordSchema),
  authCtrl.resetPassword
);

//logout
router.post("/logout", CheckLogin, authCtrl.logoutUser);

module.exports = router;
