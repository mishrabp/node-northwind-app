//this middleware is called to verify if the user is admin or not

const common = require("../utility/common");

module.exports = function (req, res, next) {
  if (req.user.role != "Admin" || req.user.role != "admin")
    return res
      .status(403)
      .render("error/error", {
        message:
          "request is forbidden. you are not athrized to access this content.",
      });

  next();
};
