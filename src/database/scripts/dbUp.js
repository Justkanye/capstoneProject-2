const { createDB: createDBQuery } = require("../queries");

(() => {
  require("../../config/db.config.init").query(createDBQuery, (err, _) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("Database created!");
    process.exit(0);
  });
})();
