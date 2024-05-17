const { generateRandomString } = require("../config/helpers");
const authSvc = require("../services/auth.service");

class AuthController {
  signup = async (req, res, next) => {
    try {
      const payload = req.body;
      payload.token = generateRandomString();

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
}

const authCtrl = new AuthController();
module.exports = authCtrl;
