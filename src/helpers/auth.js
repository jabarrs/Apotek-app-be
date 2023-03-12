const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "900s",
  });
  return accessToken;
};

const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  return refreshToken;
};

const generateResetToken = (payload) => {
  const resetToken = jwt.sign(payload, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return resetToken;
};

module.exports = {generateAccessToken, generateRefreshToken, generateResetToken}
