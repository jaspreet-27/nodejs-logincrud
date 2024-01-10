const mongoose = require("mongoose");
const myScema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "admin",  
    },
    isDeleted: {
      type: Boolean,
      default: false // Mark as not deleted by default
    },
    deviceType: { type: String, default: null },
    token: { type: String, default: null },
  },
  { versionKey: false }
);

const user = mongoose.model("user", myScema);
module.exports = user;
