const {
  generateRandomString,
  getTokenFromHeaders,
  deleteFile,
} = require("../config/helpers");
const authSvc = require("../services/auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSvc = require("../services/mail.service");
const UserModel = require("../model/user.model");
require("dotenv").config();
const { cloudinary } = require("../middlewares/uploader.middleware");

class AuthController {
  signup = async (req, res, next) => {
    try {
      const payload = req.body;
      payload.token = generateRandomString();
      payload.image = req.file.path;

      const response = await authSvc.storeSignUpPayload(payload);

      const msg = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                <h2 style="text-align: center;">Email Verification</h2>
                <p>Hello, ${payload.fullName}</p>
                <p>You have signed up in our app.</p>
                <p>Please click the link below to complete your registration process.</p>
                <a href="${process.env.FE_URL}/activate/${payload.token}">CLICK HERE</a>
                <p>If you did not sign up, please ignore this email.</p>
                <p>Thank you</p>
            </div>`;

      const mailAck = await mailSvc.emailSend(
        payload.email,
        "Activate your account",
        msg
      );

      res.json({
        result: response,
        message: "User registered. Now verify email to continue.",
        meta: null,
      });
    } catch (error) {
      console.log("Sign Up Controller: ", error);
      next(error);
    }
  };

  verifyToken = async (req, res, next) => {
    try {
      let token = req.params.token;
      let userDetail = await authSvc.getUserByFilter({ token: token });
      if (userDetail) {
        res.json({
          result: userDetail,
          message: "Token Verified",
          meta: null,
        });
      } else {
        userDetail = await authSvc.getUserByFilter({ resetToken: token });
        if (userDetail) {
          res.json({
            result: userDetail,
            message: "Token Verified",
            meta: null,
          });
        } else {
          next({
            code: 400,
            message: "Token does not exists",
            result: { token },
          });
        }
      }
    } catch (error) {
      console.log("verifyToken: ", error);
      next(error);
    }
  };

  setPassword = async (req, res, next) => {
    try {
      const data = req.body;
      const token = req.params.token;

      let userDetail = await authSvc.getUserByFilter({ token: token });

      if (userDetail) {
        const encPassword = bcrypt.hashSync(data.password, 10);

        const updateBody = {
          password: encPassword,
          token: null,
          status: "active",
        };

        const updateResponse = await authSvc.updateUser(
          { token: token },
          updateBody
        );
        res.json({
          result: updateResponse,
          message: "User Activated Successfully",
          meta: null,
        });
      } else {
        next({
          code: 400,
          message: "User doesn't exists or token expired or broken",
          result: data,
        });
      }
    } catch (error) {
      console.log("SetPassword: ", error);
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const credentials = req.body;
      let userDetail = await authSvc.getUserByFilter({
        email: credentials.email,
      });

      if (userDetail) {
        if (userDetail.token === null && userDetail.status === "active") {
          if (bcrypt.compareSync(credentials.password, userDetail.password)) {
            let token = jwt.sign(
              {
                userId: userDetail._id,
              },
              process.env.JWT_SECRET,
              {
                algorithm: "HS256",
                expiresIn: "1d",
              }
            );
            let refreshToken = jwt.sign(
              {
                userId: userDetail._id,
              },
              process.env.JWT_SECRET,
              {
                algorithm: "HS256",
                expiresIn: "10d",
              }
            );

            let patData = {
              userId: userDetail._id,
              token: token,
              refreshToken: refreshToken,
            };
            await authSvc.storePAT(patData);
            res.json({
              result: {
                token: token,
                refreshToken: refreshToken,
                type: "Bearer",
                userDetail: {
                  userId: userDetail._id,
                  fullName: userDetail.fullName,
                  role: userDetail.role,
                },
              },
            });
          } else {
            next({ code: 400, message: "Credential doesn't match" });
          }
        } else {
          next({ code: 401, message: "User not activated" });
        }
      } else {
        next({ code: 400, message: "User doesn't exist" });
      }
    } catch (error) {
      console.log("Login: ", error);
      next(error);
    }
  };

  getLoggedInUser = async (req, res, next) => {
    try {
      const user = await authSvc.getUserByFilter({ _id: req.authUser._id });
      res.json({
        result: req.authUser,
        message: "Logged In User data fetched",
        meta: null,
      });
    } catch (except) {
      console.log("Logged In User: ", except);
      next(except);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query["search"]) {
        filter = {
          $or: [
            {
              name: new RegExp(req.query["search"], "i"),
            },
            {
              email: new RegExp(req.query["search"], "i"),
            },
            {
              role: new RegExp(req.query["search"], "i"),
            },
            {
              status: new RegExp(req.query["search"], "i"),
            },
          ],
        };
      }

      let page = req.query["page"] || 1;
      let limit = req.query["limit"] || 15;
      let skip = (page - 1) * limit;

      let sort = {
        _id: "desc",
      };

      if (req.query.sort) {
        let split = req.query.sort.split("=");

        sort = { [split[0]]: split[1] };
      }
      const users = await authSvc.getUsers(
        filter,
        { skip: skip, limit: limit },
        sort
      );
      res.json({
        result: users,
        message: "Logged In User data fetched",
        meta: {
          page: page,
          limit: limit,
          total: await UserModel.countDocuments(),
        },
      });
    } catch (except) {
      console.log("Get all users: ", except);
      next(except);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const userDetail = await authSvc.getUserByFilter({
        _id: req.authUser._id,
      });
      if (userDetail) {
        const updateBody = {
          ...req.body,
        };

        if (req.file) {
          updateBody.image = req.file.path;
          const publicId = userDetail.image
            ? userDetail.image.split("/").pop().split(".")[0]
            : null;

          if (publicId) {
            await CloudinaryStorage.uploader.destroy(publicId);
          }
        }
        const update = await authSvc.updateUser(
          { _id: req.authUser._id },
          updateBody
        );

        res.json({
          result: update,
          message: "User updated successfully",
          meta: null,
        });
      } else {
        next({ code: 400, message: "User doesn't exist" });
      }
    } catch (except) {
      console.log("updateUser: ", except);
      next(except);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const userDetail = await authSvc.getUserByFilter({
        _id: req.authUser._id,
      });
      if (userDetail) {
        const deleted = await authSvc.deleteUser(req.authUser._id);

        // Extract the public ID from the existing image URL
        const publicId = userDetail.image
          ? userDetail.image.split("/").pop().split(".")[0]
          : null;

        // Delete the old image from Cloudinary if it exists
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
        res.json({
          result: deleted,
          message: "User deleted successfully",
          meta: null,
        });
      } else {
        next({ code: 400, message: "User doesn't exist" });
      }
    } catch (except) {
      console.log("deleteUser: ", except);
      next(except);
    }
  };

  forgetPassword = async (req, res, next) => {
    try {
      let body = req.body;

      let userDetail = await authSvc.getUserByFilter({ email: body.email });
      if (userDetail.status === "active") {
        let token = generateRandomString();
        let expiry = Date.now() + 86400000;

        let updateData = {
          resetToken: token,
          resetExpiry: expiry,
        };

        let status = await authSvc.updateUser(
          {
            _id: userDetail._id,
          },
          updateData
        );

        const msg = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                <h2 style="text-align: center;">Email Verification</h2>
                <p>Hello, ${userDetail.fullName}</p>
                <p>You have requested to reset your password.</p>
                <p>Please click the link below to reset.</p>
                <a href="${process.env.FE_URL}/reset/${token}">CLICK HERE</a>
                <p>If you did not request this, please ignore this email.</p>
                <p>Thank you</p>
            </div>`;

        await mailSvc.emailSend(userDetail.email, "Reset your Password", msg);

        res.json({
          result: null,
          message: "Check email for further processing",
          meta: null,
        });
      } else {
        next({ code: 400, message: "User is not Activated" });
      }
    } catch (excpt) {
      next(excpt);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      let payload = req.body;
      let token = req.params.resetToken;
      let userDetail = await authSvc.getUserByFilter({
        resetToken: token,
      });
      if (!userDetail) {
        throw { code: 400, message: "Token not found" };
      } else {
        let todays = new Date();
        if (todays > userDetail.resetExpiry) {
          next({ code: 400, message: "Token Expired" });
        } else {
          let updateData = {
            password: bcrypt.hashSync(payload.password, 10),
            resetExpiry: null,
            resetToken: null,
          };
          const updatedResponse = await authSvc.updateUser(
            {
              resetToken: token,
            },
            updateData
          );

          res.json({
            result: null,
            message: "Password reset successfully",
            meta: null,
          });
        }
      }
    } catch (excpt) {
      next(excpt);
    }
  };

  logoutUser = async (req, res, next) => {
    try {
      let token = getTokenFromHeaders(req);
      token = token.split(" ").pop();
      if (!token) {
        next({ code: 401, message: "Token Required" });
      } else {
        let loggedout = await authSvc.deletePAT(token);
        res.json({
          result: null,
          message: "Logged Out Success",
          meta: null,
        });
      }
    } catch (except) {
      next(except);
    }
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;
