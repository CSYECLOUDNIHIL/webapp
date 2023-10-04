import { startServer } from '../server'; // Import the server.js
import request from 'supertest';

describe('GET /healthz', () => {
  let app;

  beforeAll(async () => {
    // Start the server
    app = await startServer();
  });

  afterAll(() => {
    // Clean up after the tests if needed
    app.close();
  });

  test('It should respond 200', async () => {
    const response = await request(app).get('/healthz');
    expect(response.statusCode).toBe(200);
  });
});
