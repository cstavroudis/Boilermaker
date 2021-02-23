const { expect } = require("chai");
const request = require("supertest");
const { db, User } = require("../db");
const app = require("../index");

describe("User routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("/api/users", () => {
    const codysEmail = "cody@email.com";

    beforeEach(async () => await User.create({ email: codysEmail }));

    it("GET /api/users", async () => {
      const res = await request(app).get("/api/users").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body[0].email).to.be.equal(codysEmail);
    });

    it("POST /api/users", async () => {
      const res = await request(app).post("/api/users").expect(404);

      expect(res.body).to.be.equal("no POST route has been created");
    });
  });
});
