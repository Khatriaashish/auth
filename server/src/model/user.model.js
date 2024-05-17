const mongoose = require("mongoose");

const UserSchemaDef = new mongoose.Schema(
  {
    fullName: {
      type: String,
      min: 2,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    image: {
      type: String,
      default: "https://avatar.iran.liara.run/public",
    },
    token: String,
    resetToken: String,
    resetExpiry: Date,
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const UserModel = mongoose.model("User", UserSchemaDef);
module.exports = UserModel;
