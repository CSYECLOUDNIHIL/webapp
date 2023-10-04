import supertest from 'supertest';
import  startServer from '../server.js';

describe('health endpoint', () => {
    it('success criteria return 200 ok', async () => {
        const response = await supertest(await startServer ()).get('/healthz');
        expect(response.status).toBe(200);
    });
});
