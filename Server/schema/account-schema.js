import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbconfig.js';

const account = sequelize.define('account', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: false,
    readonly: true
  },
  first_name: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
    
  },
  password: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
    writeonly: true
  },
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  account_created: {
    type: DataTypes.DATE,
    primaryKey: false,
    allowNull: false,
    readonly: true,
    defaultValue: new Date()
    
  },
  account_updated: {
    type: DataTypes.DATE,
    primaryKey: false,
    allowNull: false,
    readonly: true,
    defaultValue: new Date()
  },
});


export default account;