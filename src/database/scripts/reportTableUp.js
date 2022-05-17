const { createReportTableQuery } = require("../queries");

(() => {
  require("../../config/db.config").query(
    createReportTableQuery,
    (err, res) => {
      if (err) {
        console.log(
          "An error occured while trying to create reports table: ",
          err.sqlMessage || err.message || err
        );
        return;
      }
      if (!res.warningCount) console.log("Reports table successfully created.");
    }
  );
})();
