const express = require("express");
const router = express.Router();
const { User } = require("../db/models/user");

// GET /api/users/
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// POST /api/users/
router.post("/", function (req, res, next) {
  res.status(404).send("no POST route has been created");
});

// PUT /api/users/:userId
router.put("/:userId", function (req, res, next) {
  /* etc */
});

// DELETE /api/users/:userId
router.delete("/:userId", function (req, res, next) {
  /* etc */
});

module.exports = router;
