const router = require("express").Router();
const reportController = require("../controllers/report.controller");
const validateToken = require("../middlewares/validateToken");
const { asyncHandler } = require("../middlewares/asyncHandler");
const isAdmin = require("../middlewares/isAdmin");
const { create: createValidator } = require("../validators/report.validator");

module.exports = (app) => {
  // create new report
  router
    .route("/create/:propertyId")
    .post(
      asyncHandler(validateToken),
      createValidator,
      asyncHandler(reportController.create)
    );

  // get all
  router.get(
    "/",
    asyncHandler(validateToken),
    asyncHandler(isAdmin),
    asyncHandler(reportController.getAll)
  );

  // get by id
  router
    .route("/:reportId")
    .get(
      asyncHandler(validateToken),
      asyncHandler(isAdmin),
      asyncHandler(reportController.getById)
    );

  // get by property
  router
    .route("/property/:propertyId")
    .get(
      asyncHandler(validateToken),
      asyncHandler(isAdmin),
      asyncHandler(reportController.getByProperty)
    );

  // delete by id
  router
    .route("/delete/:reportId")
    .post(
      asyncHandler(validateToken),
      asyncHandler(isAdmin),
      asyncHandler(reportController.deleteById)
    );

  app.use("/api/v1/reports", router);
};
