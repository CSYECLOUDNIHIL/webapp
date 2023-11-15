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
    unique:'compositeIndex'
  },
  points: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 10,
    },
  },
  num_of_attemps: {
    type: DataTypes.INTEGER,
    primaryKey: false,
    allowNull: false,
    validate: {
      isInt: true,
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
  },
  assignment_updated: {
    type: DataTypes.DATE,
    primaryKey: false,
    allowNull: false,
    readonly: true,
  },
  created_by: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
    readonly: true,
    unique:'compositeIndex'
  },
  updated_by: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
    readonly: true,
  },
});

module.exports = assignment;
