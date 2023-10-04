import startServer from '../server.js';
import supertest from 'supertest';

describe('health endpoint', () => {
  let server;

  beforeAll(async () => {
    server = await startServer();
  });
  it('success criteria return 200 ok', async () => {
    const response = await supertest(server).get('/healthz');
    expect(response.status).toBe(200);
  });
});
