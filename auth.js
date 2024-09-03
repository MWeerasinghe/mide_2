const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const { User } = require('./sequelize');

// OAuth2 Strategy
passport.use(new OAuth2Strategy({
  authorizationURL: 'https://example.com/auth',
  tokenURL: 'https://example.com/token',
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  callbackURL: '/auth/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create a user based on OAuth2 profile
    let user = await User.findOne({ where: { email: profile.email } });
    if (!user) {
      user = await User.create({ email: profile.email });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;
