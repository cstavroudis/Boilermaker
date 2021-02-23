const db = require("./database");
// const { User } = require("./models/user");

// associations
// User.hasMany(Other);
// Other.belongsTo(User);

// register models
require("./models");

module.exports = db;
// {
//   db,
//   User,
//   // Other,
// };
