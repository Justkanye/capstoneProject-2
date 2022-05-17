const router = require("express").Router();
const userController = require("../controllers/user.controller");
const validateToken = require("../middlewares/validateToken");
const { asyncHandler } = require("../middlewares/asyncHandler");
const {
  signup: signupValidator,
  signin: signinValidator,
  resetPassword: resetPasswordValidator,
  update: updateValidator,
} = require("../validators/user.validator");

module.exports = (app) => {
  // user sign up
  router
    .route("/signup")
    .post(signupValidator, asyncHandler(userController.signUp));

  // user sign in
  router.post("/signin", signinValidator, asyncHandler(userController.signIn));

  // password reset
  router
    .route("/reset-password")
    .patch(
      asyncHandler(validateToken),
      resetPasswordValidator,
      asyncHandler(userController.resetPassword)
    );

  // profile update
  router
    .route("/update")
    .patch(
      asyncHandler(validateToken),
      updateValidator,
      asyncHandler(userController.updateCurrentUser)
    );

  app.use("/api/v1/auth", router);
};
