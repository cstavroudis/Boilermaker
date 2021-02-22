const router = require("express").Router();

// matches all requests to /api/routeName/
router.use("/routeName", require("./routeName"));

router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
