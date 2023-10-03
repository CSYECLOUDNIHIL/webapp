import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_CREATED,
  port: process.env.DB_NAME_PORT,
  logging: false
});


export default sequelize ;
