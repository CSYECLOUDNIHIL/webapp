import supertest from 'supertest';
import app, { startServer } from '../server.js';

describe('health endpoint', () => {
    beforeAll(() => {
        startServer(); // Start the server before running tests
    });

    it('success criteria return 200 ok', async () => {
        const response = await supertest(app).get('/healthz');
        expect(response.status).toBe(200);
    });
});
