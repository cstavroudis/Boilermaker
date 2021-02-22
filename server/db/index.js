const db = require("./database");
const { Model, Other } = require("./models");

// associations
Model.hasMany(Other);
Other.belongsTo(Model);

module.exports = {
  db,
  Model,
  Other,
};
