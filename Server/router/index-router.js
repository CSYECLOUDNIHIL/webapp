const healtzRouter = require('./healthz-router.js');
const { responseHeaders } = require('../response/response-methods.js');

const route = (app) => {
    
    app.use('/healthz', healtzRouter);
    app.use((request, response) => {
        // responseHeaders(response);
        response.status(404).send();
    });
};

module.exports = route;
