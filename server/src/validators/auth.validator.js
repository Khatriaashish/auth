const { z } = require("zod");

const signUpSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
});

const setPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/,
        "Password must be 8-20 characters, must include atleast one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

const emailValidationSchema = z.object({
  email: z.string().email().min(1),
});

const updateUserSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
});

module.exports = {
  signUpSchema,
  setPasswordSchema,
  loginSchema,
  emailValidationSchema,
  updateUserSchema,
};
