const { generateRandomString } = require("../config/helpers");
const authSvc = require("../services/auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  signup = async (req, res, next) => {
    try {
      const payload = req.body;
      payload.token = generateRandomString();
      payload.image = req.file.filename;

      const response = await authSvc.storeSignUpPayload(payload);

      const msg = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                <h2 style="text-align: center;">Email Verification</h2>
                <p>Hello, ${payload.name}</p>
                <p>You have signed up in our app.</p>
                <p>Please click the link below to complete your registration process.</p>
                <a href="${process.env.FE_URL}/activate/${payload.token}">${process.env.FE_URL}/activate/${payload.token}</a>
                <p>If you did not sign up, please ignore this email.</p>
                <p>Thank you</p>
            </div>`;

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
      const token = req.params.token;
      let userDetail = await authSvc.getUserByFilter({ token: token });
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
          next({ code: 401, messsage: "User not activated" });
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
}

const authCtrl = new AuthController();
module.exports = authCtrl;
