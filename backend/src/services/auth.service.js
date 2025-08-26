const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserService = require('./user.service');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await UserService.findById(id);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserService.findByGoogleId(profile.id);
    if (!user) {
      user = await UserService.create({
        googleId: profile.id,
        email: profile.emails?.[0].value,
        name: profile.displayName
      });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));
