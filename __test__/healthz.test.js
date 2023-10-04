
const request = require("supertest");
const app = require('../server');

describe("GET /healthz ", () => {

    test("It should respond 200", async () => {
  
      const response = await request(app).get("/healthz");
  
      expect(response.statusCode).toBe(200);
  
    });
  
  });
