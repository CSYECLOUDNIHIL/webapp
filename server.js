import express from "express";
import route from './Server/router/index-router.js'
import   sequelize   from './config/dbconfig.js';
import { Sequelize , Op } from 'sequelize';
import fs from 'fs';
import csvParser from 'csv-parser';
import account from './Server/schema/account-schema.js';
import dotenv from 'dotenv';
import { promises } from "dns";
import bcrypt from 'bcrypt';
dotenv.config();

//variable decalaration
const port = process.env.SERVER_PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let server;
const decryptrion = async (obj) => {
    const hashpassword =  bcrypt.hash(obj,10);
    return hashpassword;
}



const loadCsvFile  = async () => {
    const csvData = [];
    try {
       const stream =  fs.createReadStream(process.env.CSV_LOCATION).pipe(csvParser({delimiter: "," , from_line: 2}));

       for await (const data of stream) {
        csvData.push(data);
       }

       return csvData;
    }
    catch(error) {
        console.log("could not load file");
    }

    

}

export async function startServer() {
    route(app);
    server = app.listen(port, () => console.log(`Connected to localhost (127.0.0.1) port ${port} (#0)`));
    try {
        try {
            await sequelize.sync({ alter: true });
            console.log("connection established and the database is present");
        }
        catch (error) {
            console.log("connection is not established and the database is not present");
            const createDb = new Sequelize({
                dialect: process.env.DB_DIALECT,
                host: process.env.DB_HOST,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME_DEFAULT,
                port: process.env.DB_NAME_PORT,
                logging: false
              });
              try {
                await createDb.query('CREATE DATABASE healthz');
                await sequelize.sync({ alter: true });
                console.log("connection established and the database is present");
              }
              catch (error) {
                console.log("the db server is down");
              }
    
    
        }
    
        const csvData = await loadCsvFile();
    
        for (const data of csvData) {
    
            const account_data = await account.findAll({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('email')), 'count_email']
                ],
                where: {
                    email: {
                        [Op.eq] : data.email
                    }
                }
            })
            if (account_data[0].get('count_email') > 0) {
                console.log('Account is already present');
            }
            else {
                const hashedPassword = await decryptrion(data.password);
                const createdAccount = await account.create({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    password: hashedPassword,
                    email: data.email
                });
                //console.log('Account created:', createdAccount.toJSON());
            }
    
        } 
    }
    catch (error) {
       // console.log("the db is down");
    }
}


export const stopServer = async () => {
    if (server) {
        server.close((err) => {
            if (err) {
                console.error('Error while stopping the server:', err);
            } else {
                console.log('Server stopped');
            }
        });
    }
}

startServer();