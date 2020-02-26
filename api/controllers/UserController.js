const bcrypt = require('bcryptjs');
const User = require('../models/User');

const UserService = require('../services/UserService');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false });
  }

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

    return res
      .status(201)
      .json({ success: true, msg: 'Registration complete' });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      methods: ['local'],
      name,
      email,
      password: hash,
    });

    await User.create(newUser);
    console.log('Registration complete');
    return res
      .status(201)
      .json({ success: true, msg: 'Registration complete' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: 'Error: failed to register' });
  }
};

const authenticate = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: 'Invalid email/password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = UserService.generateJWToken(user);
      return res.json({
        success: true,
        token: `JWT ${token}`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
    return res.json({ success: false, msg: 'Invalid email or password' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: 'Internal Server Error' });
  }
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
