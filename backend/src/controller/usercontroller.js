const { v4: uuidv4 } = require("uuid");
const User = require("../model/user");

const OTP_EXPIRY = 5 * 60 * 1000; // 5 min
const BLOCK_TIME = 10 * 60 * 1000; // 10 min

// Request OTP 
exports.requestOtp = async (req, res) => {
  const { user } = req.body;
  if (!user) return res.status(400).json({ message: "Required" });

  let record = await User.findOne({ identifier: user });

  if (record?.blockedUntil && record.blockedUntil > Date.now()) {
    return res.status(403).json({ message: "Blocked for 10 minutes" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log("OTP:", otp);

  if (!record) record = new User({ identifier: user });

  record.otp = otp;
  record.attempts = 0;
  record.otpExpires = Date.now() + OTP_EXPIRY;
  record.blockedUntil = null;

  await record.save();
  res.json({ message: "OTP sent" });
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { user, otp } = req.body;

  const record = await User.findOne({ identifier: user });
  if (!record) return res.status(400).json({ message: "Invalid request" });

  if (record.blockedUntil && record.blockedUntil > Date.now()) {
    return res.status(403).json({ message: "Blocked for 10 minutes" });
  }

  if (Date.now() > record.otpExpires) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (record.otp !== Number(otp)) {
    record.attempts += 1;
    if (record.attempts >= 3) {
      record.blockedUntil = Date.now() + BLOCK_TIME;
    }
    await record.save();
    return res.status(401).json({ message: "Invalid OTP" });
  }

  record.token = uuidv4();
  await record.save();

  res.json({ token: record.token });
};

// Get User
exports.getMe = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token" });

  const user = await User.findOne({ token });
  if (!user) return res.status(401).json({ message: "Invalid token" });

  res.json({ identifier: user.identifier });
};
