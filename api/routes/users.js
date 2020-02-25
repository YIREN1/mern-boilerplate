const express = require('express');
const passport = require('passport');
const catchError = require('../util/catchError');

const UserView = require('../presentations/UserView.js');

const router = express.Router();
const userService = require('../services/UserService');

const UsersController = require('../controllers/users');

const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('googleToken', { session: false });

router.get('/confirmation/:token', UsersController.confirmEmail);

// Resigter
router.post('/register', UsersController.register);

// Authenticate
router.post('/authenticate', UsersController.authenticate);

router.post('/oauth/google', passportGoogle, UsersController.googleAuth);

router.post(
  '/oauth/link/google',
  passportJWT,
  passport.authorize('googleToken', { session: false }),
  UsersController.linkGoogle
);

router.post('/oauth/unlink/google', passportJWT, UsersController.unlinkGoogle);

router.route('/forgot-password').post(UsersController.forgotPassword);

router
  .route('/reset-password')
  .get(UsersController.renderResetPasswordTemplate)
  .post(passportJWT, UsersController.resetPassword);

// router.get('/2fa', (req, res, next) => {

// });

// router.post('/2fa:token', (req, res, next) => { });

// Profile
router.get('/profile', passportJWT, UsersController.getProfile);

router.get(
  '/v1/all',
  passportJWT,
  catchError(async (req, res) => {
    const users = await userService.getUsersInChat();
    res.json(users.map(user => new UserView(user)));
  })
);

module.exports = router;
