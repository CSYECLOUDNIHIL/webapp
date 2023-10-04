const app = require('../server');
const request = require("supertest");

describe('health endpoint', () => {
    beforeAll(() => {
        startServer(); // Start the server before running tests
    });

    it('success criteria return 200 ok', async () => {
        const response = await supertest(app).get('/healthz');
        expect(response.status).toBe(200);
    });
});
