const passport = require("passport");
const router = require("express").Router();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../db/models/user");

let googleConfig;

// collect google configuration into an object
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log("Google client ID / secret not found. Skipping Google OAuth.");
} else {
  googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  };
}

// passport will invoke function after google sends user's profile and access token
const strategy = new GoogleStrategy(
  googleConfig,
  (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const email = profile.emails[0].value;
    const imgUrl = profile.photos[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const fullName = profile.displayName;

    User.findOrCreate({
      where: { googleId },
      defaults: { email, imgUrl, firstName, lastName, fullName },
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
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

module.exports = router;
