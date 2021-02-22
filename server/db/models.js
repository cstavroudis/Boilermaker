// PUT MODELS IN SEPARATE FILES

const Sequelize = require("sequelize");
const db = require("./database");

// model(s)
const Model = db.define("model", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

const Other = db.define("other", {
  name: Sequelize.INTEGER,
});

module.exports = {
  Model,
  Other,
};
