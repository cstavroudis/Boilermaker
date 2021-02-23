const express = require("express");
const path = require("path");
const morgan = require("morgan");
const { db } = require("./db");
const { User } = require("./db/models/user");
const session = require("express-session");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const app = express();
const socketio = require("socket.io");
const PORT = 3000; //process.env.PORT || 3000;

if (process.env.NODE_ENV === "development") {
  require("../secrets"); // this will mutate the process.env object with your secrets.
}

// passport registration
passport.serializeUser((user, done) => {
  try {
    // store user.id on the session
    done(null, user.id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Logging middleware
app.use(morgan("dev"));

// Create database store
const dbStore = new SequelizeStore({ db: db });

dbStore.sync();

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "This is not a very secure secret...",
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport -  to consume req.session obj & attach the user to the request obj
app.use(passport.initialize());
app.use(passport.session());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, "../public")));

//Routes
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
}); // Send index.html for any other requests

// Error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

db.sync().then(() => {
  console.log("db synced");
  const server = app.listen(PORT, () =>
    console.log(`listening on port ${PORT}`)
  );
  // set up our socket control center
  const io = socketio(server);
  require("./socket")(io);
});

module.exports = app;
