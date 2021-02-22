const { db } = require("./server/db/database");
const app = require("./server");
const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  console.log("db synced");
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
});
