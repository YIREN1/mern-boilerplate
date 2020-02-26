const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const generateJWToken = user => {
  const jwtUser = user;
  delete jwtUser.password;
  return jwt.sign(jwtUser.toJSON(), jwtSecret, {
    expiresIn: 604800, // 1 week in seconds
  });
};

module.exports = {
  generateJWToken,
};
