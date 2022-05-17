const router = require("express").Router();
const propertyController = require("../controllers/property.controller");
const validateToken = require("../middlewares/validateToken");
const isPropertyOwner = require("../middlewares/isPropertyOwner");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../utils/multer");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
  create: createValidator,
  update: updateValidator,
} = require("../validators/property.validator");

module.exports = (app) => {
  // get all properties
  router.get("/", asyncHandler(propertyController.getAll));

  // get properties by type
  router.get("/search", asyncHandler(propertyController.getByType));

  // get properties by owner
  router.get("/owner/:userId", asyncHandler(propertyController.findByOwner));

  // create a new property
  router.post(
    "/",
    asyncHandler(upload.array("image")),
    asyncHandler(validateToken),
    asyncHandler(isAdmin),
    createValidator,
    asyncHandler(propertyController.create)
  );

  // update a property
  router.patch(
    "/:propertyId",
    asyncHandler(validateToken),
    asyncHandler(isAdmin),
    asyncHandler(isPropertyOwner),
    updateValidator,
    asyncHandler(propertyController.update)
  );

  // update a property's status to sold
  router.patch(
    "/:propertyId/sold",
    asyncHandler(validateToken),
    asyncHandler(isAdmin),
    asyncHandler(isPropertyOwner),
    asyncHandler(propertyController.updateStatus)
  );

  // delete property by id
  router.delete(
    "/:propertyId",
    asyncHandler(validateToken),
    asyncHandler(isAdmin),
    asyncHandler(isPropertyOwner),
    asyncHandler(propertyController.delete)
  );

  // get property by id
  router.get("/:propertyId", asyncHandler(propertyController.getById));

  app.use("/api/v1/property", router);
};
