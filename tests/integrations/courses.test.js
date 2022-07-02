const request = require("supertest");
const { exception } = require("winston");
const { User } = require("../../models/user");

let server;
describe("/api/courses", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
  });

  describe("GET /", () => {
    it("should return 401 when no token is sent", async () => {
      const res = await request(server).get("/api/courses");
      expect(res.status).toBe(401);
    });
  });

  describe("GET /", () => {
    it("should return 200 when a token is sent", async () => {
      const user = new User({});
      const token = user.generateUserToken();
      const res = await request(server)
        .get("/api/courses")
        .set("x-auth-token", token);
      expect(res.status).toBe(200);
    });
    ``;
  });

  describe("POST /", () => {
    let token = "";
    let name = "";
    // happy path
    const exec = async () => {
      return await request(server)
        .post("/api/courses")
        .send({ name })
        .set("x-auth-token", token);
    };

    beforeEach(() => {
      token = new User().generateUserToken();
      name = "abcd";
    });

    it("should return 400 if client is course name is less then 3 chars", async () => {
      name = "ab";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 200 if course name is more then 3 chars and less then 50", async () => {
      name = "Hebrew";
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", name);
    });

    it("should return 400 if course name is longer then 50", async () => {
      name = new Array(55).join("a"); // create 'aaaaa...aaa' with length of 54
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});
