const request = require('supertest');
const express = require("express");
const app = express();

const route = require('../Server/router/healthz-router.js');
app.use('/healthz',route);



describe('GET /healthz', () => {
  it('should respond with status 200', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
  });

  // Add more test cases as needed for your API endpoints
});
