const db = require("../config/db.config");
require("../database/scripts/reportTableUp");
const {
  createNewReport,
  getByIdentifier,
  deleteReportQuery,
} = require("../database/queries");

class Report {
  constructor(property_id, reason, description) {
    this.property_id = property_id;
    this.reason = reason;
    this.description = description;
  }

  // creates a new report
  static create(newReport, result) {
    db.query(
      createNewReport,
      [newReport.property_id, newReport.reason, newReport.description],
      (err, res) => {
        if (err) {
          result(
            { status: "error", message: err.sqlMessage || err.message },
            null
          );
          return;
        }
        console.log("New report created successfully!");
        this.findById(res.insertId, result);
      }
    );
  }

  // find by id
  static findById(id, result) {
    db.query(getByIdentifier("reports", "id"), [id], (err, res) => {
      if (err) {
        result(
          { status: "error", message: err.sqlMessage || err.message },
          null
        );
        return;
      }
      if (res[0]) {
        console.log("Found report");
        result(null, { status: "success", data: res[0] });
        return;
      }
      // not found
      result({ kind: "Not found" }, null);
      return;
    });
  }

  // find by user
  static findReportByProperty(property_id, result) {
    db.query(
      getByIdentifier("reports", "property_id"),
      [property_id],
      (err, res) => {
        if (err) {
          result(
            { status: "error", message: err.sqlMessage || err.message },
            null
          );
          return;
        }
        if (res) {
          console.log(`Found ${res.length} reports`);
          result(null, { status: "success", data: res });
          return;
        }

        // not found
        result({ kind: "not found" }, null);
        return;
      }
    );
  }

  // get all
  static getAll(result) {
    db.query(getByIdentifier("reports"), (err, res) => {
      if (err) {
        result(
          { status: "error", message: err.sqlMessage || err.message },
          null
        );
        return;
      }
      console.log(`Found ${res.length} reports`);
      result(null, { status: "success", data: res });
      return;
    });
  }

  //delete
  static deleteReportById(id, result) {
    db.query(deleteReportQuery, [id], (err, res) => {
      if (err) {
        result(
          { status: "error", message: err.sqlMessage || err.message },
          null
        );
        return;
      }

      result(null, { status: "success", data: res });
    });
  }
}

module.exports = Report;
