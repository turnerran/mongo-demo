const { User } = require("../../../models/user");
const request = require("supertest");

describe("auth middleware", () => {
  let server;
  let token;

  const exec = () => {
    return request(server).get("/api/courses").set("x-auth-token", token);
  };

  beforeEach(() => {
    server = require("../../../index");
    token = new User().generateUserToken();
  });
  afterEach(async () => {
    await server.close();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if invalid token is provided", async () => {
    token = "abc";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
