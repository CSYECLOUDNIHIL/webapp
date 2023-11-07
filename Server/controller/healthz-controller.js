const sequelize = require('../../config/dbconfig.js');
const account = require('../schema/account-schema.js');
const logger = require('../../config/logger.js');

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
    try {
        console.log(request.query);
        if (request.get('Content-Length') > 0 && JSON.stringify(request.body)) {
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
        console.log(error)
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
    try {
        if (request.get('Content-Length') > 0) {
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
    try {
        console.log(JSON.stringify(request.body) === '{}');
        if (request.get('Content-Length') > 0) {
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
    try {
        if (request.get('Content-Length') > 0) {
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
