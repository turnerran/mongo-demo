const mongoose = require("mongoose");
const request = require("supertest");
const { User } = require("../../models/user");

let server;

describe("/api/users", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
    await User.remove({});
  });

  describe("Get /", () => {
    it("should return all users", async () => {
      await User.collection.insertMany([
        {
          email: "ran1",
        },
        {
          email: "ran2",
        },
      ]);
      const res = await request(server).get("/api/users");
      expect(res.status).toBe(200);
      expect(res.body.some((x) => x.email === "ran1")).toBeTruthy();
      expect(res.body.some((x) => x.email === "ran2")).toBeTruthy();
    });
  });

  describe("Get /:id", () => {
    it("should return specific user if a valid user is passed", async () => {
      const name = "ran test 1";
      const email = "some-email";
      const user = new User({
        name,
        email,
        password: "1234",
      });
      await user.save();
      const res = await request(server).get(`/api/users/${user._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", name);
      expect(res.body).toHaveProperty("email", email);
    });

    it("should return 404 if not valid id is passed", async () => {
      const res = await request(server).get(`/api/users/1`);
      expect(res.status).toBe(404);
    });

    it("should return 404 if no such user exist", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/users/${id}`);
      expect(res.status).toBe(404);
    });
  });
});
