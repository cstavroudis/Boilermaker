const { expect } = require("chai");
const request = require("supertest");
const db = require("../db");
const app = require("../index");
const User = db.User;

describe("User routes", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
});
