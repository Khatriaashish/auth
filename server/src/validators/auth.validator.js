const { z } = require("zod");

const signUpSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
});

module.exports = { signUpSchema };
