const router = require("express").Router();
const { User } = require("../db/models/user");

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login((user, err) => {
        if (err) next(err);
        else res.json(user);
      });
    }
  } catch (err) {
    next(err);
  }
});

// POST /auth/signup
router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    console.log("there was an error with POST /auth/signup");
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

// GET /auth/me
router.get("/me", (req, res) => {
  res.json(req.user);
});

router.use("/google", require("./google"));

module.exports = router;
