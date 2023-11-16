const sequelize = require('../../config/dbconfig.js');
const account = require('../schema/account-schema.js');
const logger = require('../../config/logger.js');
const statsd = require('../../config/statsd-config.js');
async function currentDate() {
    const currentDate = new Date();
    const date = currentDate.toUTCString();
    return date;
}

async function connection() {
    const connection = await sequelize.sync();
    try {
        if (connection) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

const index = async (request, response) => {
    statsd.increment('api.getall.healthz');
    try {
        console.log(request.query);
        if (request.get('Content-Length') > 0 && JSON.stringify(request.body)) {
            logger.error("Get api hit  for /healthz/ bad request");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(400).send(); //json({ message: 'Body not allowed' });
        } else if (await connection()) {
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            logger.info('Get api hit  for /healthz/');
            

            response.status(200).send(); //json({ message: '200 ok' });
            
        }
    } catch (error) {
        logger.error("Get api hit  for /healthz/ internal server error");
        response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
        response.set('Pragma', 'no-cache');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.removeHeader('Content-Type');
        response.removeHeader('connection');
        response.removeHeader('keep-alive');
        response.setHeader('Date', await currentDate());
        response.setHeader('Content-Length', 0);
        response.status(503).send(); //json({ message: 'Internal Server Error' });
    }
};

const post = async (request, response) => {
    statsd.increment('api.create.healthz');
    try {
        if (request.get('Content-Length') > 0) {
            logger.error("Create api hit  for /healthz/ bad request");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(400).send(); //json({ message: 'Body not allowed' });
        } else if (request.get('Content-Length') == 0) {
            logger.error("Create api hit  for /healthz/ method not allowed");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(405).send(); //json({ message: 'Not Found: The requested resource could not be found on the server.' });
        } else if (JSON.stringify(request.body) === '{}') {
            logger.error("Create api hit  for /healthz/ method not allowed");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(405).send(); //json({ message: 'Not Found: The requested resource could not be found on the server.' });
        } else if (await connection()) {
            logger.error("Create api hit  for /healthz/ bad request");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(400).send(); //json({ message: 'Body not allowed' });
        }
    } catch (error) {
        logger.error("Create api hit  for /healthz/ internal server error");
        response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
        response.set('Pragma', 'no-cache');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.removeHeader('Content-Type');
        response.removeHeader('connection');
        response.removeHeader('keep-alive');
        response.setHeader('Date', await currentDate());
        response.setHeader('Content-Length', 0);
        response.status(503).send(); //json({ message: 'Internal Server Error' });
    }
};

const update = async (request, response) => {
    statsd.increment('api.update.healthz');
    try {
        console.log(JSON.stringify(request.body) === '{}');
        if (request.get('Content-Length') > 0) {
            logger.error("Update api hit  for /healthz/ bad request");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(400).send(); //json({ message: 'Body not allowed' });
        } else if (request.get('Content-Length') == 0) {
            logger.error("Update api hit  for /healthz/ method not allowed" );
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(405).send(); //json({ message: 'Not Found: The requested resource could not be found on the server.' });
        } else if (JSON.stringify(request.body) === '{}') {
            logger.error("Update api hit  for /healthz/ method not allowed");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(405).send(); //json({ message: 'Not Found: The requested resource could not be found on the server.' });
        } else if (await connection()) {
            logger.error("Update api hit  for /healthz/ bad request");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(400).send(); //json({ message: 'Body not allowed' });
        }
    } catch (error) {
        logger.error("Update api hit  for /healthz/ internal server error");
        response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
        response.set('Pragma', 'no-cache');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.removeHeader('Content-Type');
        response.removeHeader('connection');
        response.removeHeader('keep-alive');
        response.setHeader('Date', await currentDate());
        response.setHeader('Content-Length', 0);
        response.status(503).send(); //json({ message: 'Internal Server Error' });
    }
};

const deleteRecord = async (request, response) => {
    statsd.increment('api.delete.healthz');
    try {
        if (request.get('Content-Length') > 0) {
            logger.error("Delete api hit  for /healthz/ bad request");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(400).send(); //json({ message: 'Body not allowed' });
        } else if (request.get('Content-Length') == null) {
            logger.error("Delete api hit  for /healthz/ not allowed");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(405).send(); //json({ message: 'Not Found: The requested resource could not be found on the server.' });
        } else if (await connection()) {
            logger.error("Delete api hit  for /healthz/ method not allowed");
            response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
            response.set('Pragma', 'no-cache');
            response.setHeader('X-Content-Type-Options', 'nosniff');
            response.removeHeader('Content-Type');
            response.removeHeader('connection');
            response.removeHeader('keep-alive');
            response.setHeader('Date', await currentDate());
            response.setHeader('Content-Length', 0);
            response.status(400).send(); //json({ message: 'Body not allowed' });
        }
    } catch (error) {
        logger.error("Delete api hit  for /healthz/ internal server error");
        response.set('Cache-Control', 'no-cache,no-store,must-revalidate');
        response.set('Pragma', 'no-cache');
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.removeHeader('Content-Type');
        response.removeHeader('connection');
        response.removeHeader('keep-alive');
        response.setHeader('Date', await currentDate());
        response.setHeader('Content-Length', 0);
        response.status(503).send(); //json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    index,
    post,
    update,
    deleteRecord,
};
