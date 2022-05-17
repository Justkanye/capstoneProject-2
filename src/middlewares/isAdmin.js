const isAdmin = (req, res, next) => {
  const is_admin = req.user.is_admin;
  if (!is_admin) {
    res.status(403).send({
      status: "error",
      error: "Unauthorized. Please upgrade your account to access this feature",
    });
    return;
  } else {
    next();
  }
};

module.exports = isAdmin;
