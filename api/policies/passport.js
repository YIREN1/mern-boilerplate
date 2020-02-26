const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;

module.exports = passport => {
  // JWT
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecret,
    passReqToCallback: true,
  };

  passport.use(
    new JwtStrategy(opts, async (req, jwtPayload, next) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          req.user = user;
          return next(null, user);
        }
        return next(null, false);
      } catch (error) {
        console.error(error);
        return next(error, false);
      }
    }),
  );
};
