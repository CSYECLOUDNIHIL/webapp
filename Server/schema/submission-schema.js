const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbconfig.js');

const submission = sequelize.define('submission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    readonly: true,
  },
  assignment_id: {
    type: DataTypes.UUID,
    primaryKey: false,
    allowNull: false,
  },
  submission_url: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
  },
  submission_date: {
    type: DataTypes.DATE,
    primaryKey: false,
    allowNull: false,
    readonly: true,
  },
  submission_updated: {
    type: DataTypes.DATE,
    primaryKey: false,
    allowNull: false,
    readonly: true,
  },
  submitted_by: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
  }
});

module.exports = submission;
