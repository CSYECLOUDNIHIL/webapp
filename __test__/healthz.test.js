import supertest from 'supertest';
import { startServer } from '../server.js'; // Import `startServer` directly if it's exported

describe('health endpoint', () => {
  let server;

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll(async () => {
    // Close the server after all tests
    await server.close();
  });

  it('success criteria return 200 ok', async () => {
    const response = await supertest(server).get('/healthz');
    expect(response.status).toBe(200);
  });
});
