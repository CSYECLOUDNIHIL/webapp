const sequelize = require('../../config/dbconfig.js');
const assignment = require('../schema/assignment-schema.js');
const account = require('../schema/account-schema.js');
const bcrypt = require('bcrypt');
const { Sequelize, Op } = require('sequelize');
const { responseHeaders } = require('../response/response-methods.js');
const logger = require('../../config/logger.js');

const  checkInvalidColumn = async (invalid) => {
    const allowedColumns = ['name', 'points', 'num_of_attemps', 'deadline'];
    const requestData = invalid;

    // Check if there are any extra fields in the request
    for (const key in requestData) {
      if (!allowedColumns.includes(key)) {
        return false;
      }
    }

/*     const extraKeys = Object.keys(invalid).filter((column) => !columns.includes(column));

    if (extraKeys.length > 0) {
      return false; // Return false if extra keys are found
    } */
    return true;
  }



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
        ////console.log('hello');
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
                const account_data = await assignment.findAll();
                //console.log(account_data);
                if (account_data) {
                    await responseHeaders(response);
                    const responseData = account_data.map(item => ({
                        id: item.id,
                        name: item.name,
                        points: item.points,
                        num_of_attemps: item.num_of_attemps,
                        deadline: item.deadline,
                        assignment_created: item.assignment_created,
                        assignment_updated: item.assignment_updated,
                        created_by: item.created_by,
                        updated_by: item.updated_by,
                      }));
                    response.status(200).json(responseData);
                    console.log("logger info to be called.......")
                    logger.info('This is an informational log message.');
                }
                else {
                    await responseHeaders(response);
                    response.status(404).send();
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
            if (passMatch) {
                await responseHeaders(response);
                const requestBody = request.body;
                const createAssignment = await assignment.findOne({
                    where: {
                        id: request.params.id
                    }
                })
                //console.log(createAssignment);
                if (createAssignment) {
                    await responseHeaders(response);
                    const responseData = {
                        id: createAssignment.id,
                        name: createAssignment.name,
                        points: createAssignment.points,
                        num_of_attemps: createAssignment.num_of_attemps,
                        deadline: createAssignment.deadline,
                        assignment_created: createAssignment.assignment_created,
                        assignment_updated: createAssignment.assignment_updated,
                        created_by: createAssignment.created_by,
                        updated_by: createAssignment.updated_by,
                      };
                    response.status(200).json(responseData);
                } else {
                    await responseHeaders(response);
                    response.status(404).send();
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

    const columnInvalidFlag = await checkInvalidColumn(request.body);
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

                const columnInvalidFlag = await checkInvalidColumn(request.body);
                //console.log(columnInvalidFlag);
                if(columnInvalidFlag == true) {
                    
                    if(request.body.name == "" || request.body.points == "" || request.body.num_of_attemps == "" || request.body.deadline == "")  {
                        await responseHeaders(response);
                        response.status(400).send();
                    }
                    else {
                        const createAssignment = await assignment.create({
                            name: request.body.name,
                            points: request.body.points,
                            num_of_attemps: request.body.num_of_attemps,
                            deadline: request.body.deadline,
                            created_by: credentials.username,
                            updated_by: credentials.username,
                            assignment_updated: new Date(),
                            assignment_created: new Date(),
                        });
                        const responseData = {
                            id: createAssignment.id,
                            name: createAssignment.name,
                            points: createAssignment.points,
                            num_of_attemps: createAssignment.num_of_attemps,
                            deadline: createAssignment.deadline,
                            assignment_created: createAssignment.assignment_created,
                            assignment_updated: createAssignment.assignment_updated,
                          };
                        setSuccessfulResponse(responseData, response);
                    }
                    

                }
                else {
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



const updatenotallowed = async (request, response) => {
    try {
            await responseHeaders(response);
            response.status(405).send();
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
                const columnInvalidFlag = await checkInvalidColumn(request.body);
                if(columnInvalidFlag == true) {
                    
                    if(request.body.name == "" || request.body.points == "" || request.body.num_of_attemps == "" || request.body.deadline == "")  {
                        await responseHeaders(response);
                        response.status(400).send();
                    }
                    else {
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
                            response.status(403).send();
                        }
                    }
                }
                else {
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
            if (passMatch) {
                await responseHeaders(response);
                const checkAssignment = await assignment.findOne({
                    where: {
                        id: request.params.id,
                    }
                });
                if (checkAssignment) {
                    const createAssignment = await checkId(request.params.id, credentials);
                    if (createAssignment) {
                        await createAssignment.destroy();
                        await responseHeaders(response);
                        response.status(204).send();
                    } else {
                        await responseHeaders(response);
                        response.status(403).send();
                    }
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
    deleteRecord,
    updatenotallowed
};
