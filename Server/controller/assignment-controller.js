const sequelize = require('../../config/dbconfig.js');
const assignment = require('../schema/assignment-schema.js');
const account = require('../schema/account-schema.js');
const bcrypt = require('bcrypt');
const { Sequelize, Op } = require('sequelize');
const { responseHeaders } = require('../response/response-methods.js');

const decryptrion = async (credentials) => {
    const account_data = await account.findAll({
        attributes: ['email', 'password'],
        where: {
            email: {
                [Op.eq]: credentials.username
            }
        }
    });
    if (account_data && account_data.length > 0) {
        const passwordMatch = await bcrypt.compare(credentials.password, account_data[0].get('password'));
        if (passwordMatch) {
            return true;
        } else {
            return false;
        }
    } else return false;
};

const connection = async () => {
    try {
        await sequelize.authenticate();
        return true;
    } catch (err) {
        //console.log('hello');
        return false;
    }
};

const checkId = async (id, credentials) => {
    const createAssignment = await assignment.findOne({
        where: {
            id: id,
            created_by: credentials.username
        }
    });
    if (createAssignment) {
        return createAssignment;
    } else {
        return null;
    }
};

const authenticateUser = async (request) => {
    const authorization = request.headers.authorization;
    const base64 = authorization.split(' ')[1];
    const credentials = Buffer.from(base64, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    return { username, password };
};

const setSuccessfulResponse = async (obj, response) => {
    response.status(201).json(obj);
};

const index = async (request, response) => {
    try {
        if (request.get('Content-Length') > 0) {
            await responseHeaders(response);
            response.status(400).send(); //json({ message: 'Body not allowed' });
        } else if (await connection()) {
            const credentials = await authenticateUser(request);
            const passMatch = await decryptrion(credentials);

            if (passMatch) {
                const account_data = await assignment.findAll({
                    where: {
                        created_by: credentials.username
                    }
                });
                if (account_data) {
                    await responseHeaders(response);
                    response.status(200).json(account_data);
                }
            } else {
                await responseHeaders(response);
                response.status(401).send();
            }
        } else {
            await responseHeaders(response);
            response.status(503).send(); //json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        await responseHeaders(response);
        response.status(503).send(); //json({ message: 'Internal Server Error' });
    }
};

const getbyone = async (request, response) => {
    try {
        if (request.get('Content-Length') > 0) {
            await responseHeaders(response);
            response.status(400).send(); //json({ message: 'Not Found: The requested resource could not be found on the server.' });
        } else if (await connection()) {
            const credentials = await authenticateUser(request);
            const passMatch = await decryptrion(credentials);
            if (passMatch == true) {
                await responseHeaders(response);
                const requestBody = request.body;

                const createAssignment = await checkId(request.params.id, credentials);

                if (createAssignment) {
                    await responseHeaders(response);
                    response.status(200).send();
                } else {
                    await responseHeaders(response);
                    response.status(200).send();
                }
            } else {
                await responseHeaders(response);
                response.status(401).send(); //json({ message: 'Body not allowed' });
            }
        } else {
            await responseHeaders(response);
            response.status(503).send(); //json({ message: 'Body not allowed' });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            await responseHeaders(response);
            response.status(400).send();
        } else {
            await responseHeaders(response);
            response.status(503).send(); //json({ message: 'Internal Server Error' });
        }
    }
};

const post = async (request, response) => {
    try {
        if (request.get('Content-Length') == 0) {
            await responseHeaders(response);
            response.status(400).send(); //json({ message: 'Not Found: The requested resource could not be found on the server.' });
        } else if (JSON.stringify(request.body) === '{}') {
            await responseHeaders(response);
            response.status(400).send(); //json({ message: 'Not Found: The requested resource could not be found on the server.' });
        } else if (await connection()) {
            const credentials = await authenticateUser(request);
            const passMatch = await decryptrion(credentials);
            if (passMatch == true) {
                await responseHeaders(response);
                const requestBody = request.body;

                const createAssignment = await assignment.create({
                    name: request.body.name,
                    points: request.body.points,
                    num_of_attemps: request.body.num_of_attemps,
                    deadline: request.body.deadline,
                    created_by: credentials.username,
                    updated_by: credentials.username
                });
                setSuccessfulResponse(createAssignment, response);
            } else {
                await responseHeaders(response);
                response.status(401).send();
            }
        } else {
            await responseHeaders(response);
            response.status(503).send();
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            await responseHeaders(response);
            response.status(400).send();
        } else {
            await responseHeaders(response);
            response.status(503).send();
        }
    }
};

const update = async (request, response) => {
    try {
        if (request.get('Content-Length') == 0) {
            await responseHeaders(response);
            response.status(400).send();
        } else if (JSON.stringify(request.body) === '{}') {
            await responseHeaders(response);
            response.status(400).send();
        } else if (await connection()) {
            const credentials = await authenticateUser(request);
            const passMatch = await decryptrion(credentials);
            if (passMatch == true) {
                await responseHeaders(response);
                const requestBody = request.body;

                const createAssignment = await checkId(request.params.id, credentials);

                if (createAssignment) {
                    await createAssignment.set({
                        name: request.body.name,
                        points: request.body.points,
                        num_of_attemps: request.body.num_of_attemps,
                        deadline: request.body.deadline,
                        updated_by: credentials.username,
                        assignment_updated: new Date()
                    });
                    const updateData = await createAssignment.save();
                    await responseHeaders(response);
                    response.status(204).send();
                } else {
                    await responseHeaders(response);
                    response.status(400).send();
                }
            } else {
                await responseHeaders(response);
                response.status(401).send();
            }
        } else {
            await responseHeaders(response);
            response.status(503).send();
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            await responseHeaders(response);
            response.status(400).send();
        } else {
            await responseHeaders(response);
            response.status(503).send();
        }
    }
};

const deleteRecord = async (request, response) => {
    try {
        if (request.get('Content-Length') > 0) {
            await responseHeaders(response);
            response.status(400).send();
        } else if (await connection()) {
            const credentials = await authenticateUser(request);
            const passMatch = await decryptrion(credentials);
            if (passMatch == true) {
                await responseHeaders(response);
                const createAssignment = await checkId(request.params.id, credentials);

                if (createAssignment) {
                    await createAssignment.destroy();
                    await responseHeaders(response);
                    response.status(204).send();
                } else {
                    await responseHeaders(response);
                    response.status(404).send();
                }
            } else {
                await responseHeaders(response);
                response.status(401).send();
            }
        } else {
            await responseHeaders(response);
            response.status(503).send();
        }
    } catch (error) {
        await responseHeaders(response);
        response.status(503).send();
    }
};

module.exports = {
    index,
    getbyone,
    post,
    update,
    deleteRecord
};
