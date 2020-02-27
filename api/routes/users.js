const express = require('express');
const passport = require('passport');

const router = express.Router();

const UsersController = require('../controllers/UserController');

const passportJWT = passport.authenticate('jwt', { session: false });

// Resigter
router.post('/register', UsersController.register);
// Authenticate
router.post('/authenticate', UsersController.authenticate);
// Profile
router.get('/profile', passportJWT, UsersController.getProfile);

router.get('/current', passportJWT, UsersController.getCurrentUser);

module.exports = router;
