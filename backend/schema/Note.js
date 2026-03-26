const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define("notes", {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
  },
});

module.exports = Note;