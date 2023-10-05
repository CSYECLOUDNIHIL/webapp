const express = require("express");
const route = require('./Server/router/index-router.js');
const { Sequelize, Op } = require('sequelize');
const sequelize = require('./config/dbconfig.js');
const fs = require('fs');
const csvParser = require('csv-parser');
const account = require('./Server/schema/account-schema.js');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

// Variable declaration
const port = process.env.SERVER_PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const decryptrion = async (obj) => {
    const hashpassword = await bcrypt.hash(obj, 10);
    return hashpassword;
}


const loadCsvFile = async () => {
    const csvData = [];
    try {
        const stream = fs.createReadStream(process.env.CSV_LOCATION).pipe(csvParser({ delimiter: ",", from_line: 2 }));

        for await (const data of stream) {
            csvData.push(data);
        }

        return csvData;
    }
    catch (error) {
        console.log("could not load file");
    }
}

async function startServer() {
route(app);
app.listen(port, () => console.log(`Connected to localhost (127.0.0.1) port ${port} (#0)`));
try {
    try {
        await sequelize.sync({ alter: true });
        console.log("connection established and the database is present");
    }
    catch (error) {
        console.log("entered here again")
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
                    [Op.eq]: data.email
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

 startServer();
