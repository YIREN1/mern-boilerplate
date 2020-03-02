const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/User');

const generateJWToken = user => {
  const jwtUser = user;
  jwtUser.password = undefined;
  return jwt.sign(jwtUser.toJSON(), jwtSecret, {
    expiresIn: 604800, // 1 week in seconds
  });
};

const findUser = async query => {
  const foundUser = await User.findOne(query);
  if (!foundUser) return null;
  delete foundUser.password;
  return foundUser;
};

module.exports = {
  generateJWToken,
  findUser,
};
