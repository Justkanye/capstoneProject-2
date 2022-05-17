const Report = require("../models/report.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: "error",
      message: "Content cannot be empty!",
    });
  }
  const { reason, description } = req.body;
  const propertyId = req.params.propertyId;
  const newReport = new Report(propertyId, reason.trim(), description.trim());
  Report.create(newReport, (err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        error: err.message || "Unable to create report",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

// Retrieve all reports from the database
exports.getAll = (req, res) => {
  Report.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        status: "error",
        error: err.message || "Unable to fetch reports",
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single report by id
exports.getById = (req, res) => {
  const reportId = req.params.reportId;
  Report.findById(reportId, (err, data) => {
    if (err) {
      if (err.kind) {
        res.status(404).send({
          status: "error",
          error: "Report not found",
        });
        return;
      }
      res.status(500).send({
        status: "error",
        error: err.message || "Unable to find report",
      });
    } else {
      res.send(data);
    }
  });
};

// Find all reports on specific property
exports.getByProperty = (req, res) => {
  const propertyId = req.params.propertyId;
  Report.findReportByProperty(propertyId, (err, data) => {
    if (err) {
      if (err.kind) {
        res.status(404).send({
          status: "error",
          error: "Report not found",
        });
        return;
      }
      res.status(500).send({
        status: "error",
        error: err.message || "Unable to find reports",
      });
    } else {
      res.send(data);
    }
  });
};

// Update a specific report
exports.updateById = (req, res) => {
  const reportId = req.params.reportId;
  if (!req.body) {
    res.status(400).send({
      status: "error",
      message: "Content cannot be empty!",
    });
  }
  const { reason, description } = req.body;
  const newReport = new Report(null, reason.trim(), description.trim());
  Report.updateById(reportId, newReport, (err, data) => {
    if (err) {
      if (err.kind) {
        res.status(404).send({
          status: "error",
          error: "Report not found",
        });
        return;
      }
      res.status(500).send({
        status: "error",
        error: err.message || "Unable to update report",
      });
    } else {
      res.send(data);
    }
  });
};

// Delete a specific report
exports.deleteById = (req, res) => {
  const reportId = req.params.reportId;
  Report.deleteReportById(reportId, (err, data) => {
    if (err) {
      if (err.kind) {
        res.status(404).send({
          status: "error",
          error: "Report not found",
        });
        return;
      }
      res.status(500).send({
        status: "error",
        error: err.message || "Unable to delete report",
      });
    } else {
      res.send(data);
    }
  });
};
