// app.test.js

const request = require("supertest");

const { app, server } = require("../index"); // Assuming your app.js is in the same directory
const Repository = require("../core/Repository");
const Logger = require("../core/Logger");

jest.mock("../core/Logger");

describe("Server Startup", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // Logger.mockClear();
  });

  afterAll((done) => {
    // Close the server to avoid keeping it running after the tests
    server.close();
    Repository.disconnect();
    done();
  });

  it("should start the server and return a success status", async () => {
    // Use supertest to make a request to the server
    const response = await request(app).get("/");
    // Add your assertions based on your server startup logic
    expect(response.status).toBe(200); // Adjust this based on your actual response logic
    expect(response.text).toContain("Server running!");
  });

  it("should start listening on specified port", () => {
    expect(server.listening).toBe(true);
    expect(server.address().port).toBe(3001);
  });

  it("should log API started message on startup", () => {
    jest.spyOn(Logger, "info");

    expect(Logger.info).toHaveBeenCalledWith("API started, Port: 3001");
  });

  it("should handle and return appropriate error response on malformed request body", async () => {
    const response = await request(app)
      .post("/api/todo")
      .set("Content-Type", "application/xml")
      .send("test");

    expect(JSON.parse(response.text).error).toBe("Malformed Request Body");
  });

  it("should respond with 404 status code and error message when GET request is made to non-existent endpoint", async () => {
    const response = await request(app)
      .get("/non-existent")
      .expect(404)
      .expect("Content-Type", /json/);

    
    expect(response.body).toEqual({ error: "Not Found!" });
  });
});
