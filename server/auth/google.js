const passport = require("passport");
const router = require("express").Router();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../db/models");

// collect google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
};
// passport will invoke function after google sends user's profile and access token
const strategy = new GoogleStrategy(
  googleConfig,
  (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const imgUrl = profile.photos[0].value;

    User.findOrCreate({
      where: { googleId },
      defaults: { email, imgUrl, name },
    })
      .then(([user]) => done(null, user))
      .catch(done);
  }
);

// register our strategy with passport
passport.use(strategy);

// GET /auth/google/
router.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// GET /auth/google/callback
router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
