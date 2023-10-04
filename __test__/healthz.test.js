import startServer from '../server.js'
import supertest from 'supertest'

describe('health endpoint',() => {
    it('success criteria return 200 ok', async () => {
        const responsVar = await supertest(startServer).get('/healthz');
        expect(response.status).toBe(200);
    })
});