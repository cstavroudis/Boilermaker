// PUT MODELS IN SEPARATE FILES

const crypto = require("crypto");
const _ = require("lodash");
const Sequelize = require("sequelize");

const db = require("./database");

// model(s)
const User = db.define(
  "user",
  {
    google_id: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
    },
  }
);

const Other = db.define("other", {
  name: Sequelize.INTEGER,
});

// instance methods
User.prototype.correctPassword = function (candidatePassword) {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt) === this.password
  );
};

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ["password", "salt"]);
};

// class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash("sha1");
  hash.update(plainText);
  hash.update(salt);
  return hash.digest("hex");
};

// salt & hash again when user enters their password for the first time
// and whenever they change it
function setSaltAndPassword(user) {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
}

module.exports = {
  User,
  Other,
};
