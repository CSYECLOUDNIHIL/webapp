const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbconfig.js');

const assignment = sequelize.define('assignment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    readonly: true,
  },
  name: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  num_of_attemps: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    allowNull: false,
    validate: {
      min: 0,
      max: 3,
    },
  },
  deadline: {
    type: DataTypes.DATE,
    primaryKey: false,
    allowNull: false,
  },
  assignment_created: {
    type: DataTypes.DATE,
    primaryKey: false,
    allowNull: false,
    readonly: true,
    defaultValue: new Date(),
  },
  assignment_updated: {
    type: DataTypes.DATE,
    primaryKey: false,
    allowNull: false,
    readonly: true,
    defaultValue: new Date(),
  },
  created_by: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
    readonly: true,
  },
  updated_by: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
    readonly: true,
  },
});

module.exports = assignment;
