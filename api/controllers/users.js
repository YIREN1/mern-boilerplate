const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const jwtSecret = process.env.JWT_SECRET;

const signToken = user => {
  const jwtUser = user;
  jwtUser.password = undefined;
  return jwt.sign(jwtUser.toJSON(), jwtSecret, {
    expiresIn: 604800, // 1 week in seconds
  });
};

const register = async (req, res) => {
  const { name, email, profileName, password, phone } = req.body;

  // Check if there is a user with the same email
  let foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use' });
  }

  // Is there a Google account with the same email?
  foundUser = await User.findOne({
    $or: [{ 'google.email': email }, { 'facebook.email': email }],
  });

  if (foundUser) {
    // Let's merge them?
    foundUser.methods.push('local');
    const localSettings = {
      email,
      password,
    };
    foundUser = Object.assign(foundUser, localSettings);
    await foundUser.save();

    return res.status(200).json({ success: true, msg: 'Registration complete' });
  }

  const newUser = {
    methods: ['local'],
    name,
    email,
    profileName,
    password,
    confirmed: false,
    phone,
  };
  try {
    await User.create(newUser);
    console.log('Registration complete');
    res.json({ success: true, msg: 'Registration complete' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: 'Error: failed to register' });
  }
};

const authenticate = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return res.json({ success: false, msg: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = signToken(user);
    return res.json({
      success: true,
      token: `JWT ${token}`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileName: user.profileName,
      },
    });
  }
  return res.json({ success: false, msg: 'Invalid email/password' });
};

const getProfile = (req, res) => {
  console.log('I managed to get here!');
  res.json({ success: true });
};

module.exports = {
  register,
  authenticate,
  getProfile,
};
