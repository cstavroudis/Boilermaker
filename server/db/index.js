const db = require("./database");
const { User, Other } = require("./models/user");

// associations
User.hasMany(Other);
Other.belongsTo(User);

module.exports = {
  db,
  User,
  Other,
};
