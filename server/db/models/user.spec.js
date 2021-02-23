const { expect } = require("chai");
const { User, db } = require("../index");

describe("User model", () => {
  beforeEach(() => db.sync({ force: true }));

  it("has email field", async () => {
    const user = await User.create({
      email: "calandra.st@gmail.com",
      password: "12345",
    });
    expect(user.email).to.equal("calandra.st@gmail.com");
  });

  describe("Instance Methods", () => {
    describe("correctPassword", () => {
      let cody;

      beforeEach(async () => {
        cody = await User.create({
          email: "cody@puppybook.com",
          password: "bones",
        });
      });

      it("returns true if the password is correct", () => {
        expect(cody.correctPassword("bones")).to.be.equal(true);
      });

      it("returns false if the password is incorrect", () => {
        expect(cody.correctPassword("bonez")).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
});
