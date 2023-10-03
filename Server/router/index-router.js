import healtzRouter from './healthz-router.js';
import { responseHeaders } from '../response/response-methods.js';

const route = (app) => {
    
    app.use('/healthz', healtzRouter);
    app.use((request, response) => {
        //responseHeaders(response);
        response.status(404).send();
    });
}

export default route;