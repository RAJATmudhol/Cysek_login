const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true }, 
  otp: Number,
  otpExpires: Date,
  attempts: { type: Number, default: 0 },
  blockedUntil: Date,
  token: String,
});

module.exports = mongoose.model("User", UserSchema);
