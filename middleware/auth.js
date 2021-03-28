//this middelware is called to check authorization of the user

const common = require("../utility/common");

module.exports = function (req, res, next) {
  try {
    const token = req.cookies.token || req.headers("x-auth-token") || "";
    if (!token) {
      req.app.set("layout", "_layouts/login");
      return res
        .status(401)
        .render("login/login", {
          message: `You are not authorized to access ${req.url}. Please login with appropriate credential.`,
        });
    }
    const decoded = common.decodeAuthToken(token);
    if (!decoded) {
      req.app.set("layout", "_layouts/login");
      return res
        .status(400)
        .render("login/login", {
          message: `Invalid request. The authorizarion token failed.`,
        });
    }
    req.user = decoded;
  } catch (ex) {
    req.app.set("layout", "_layouts/login");
    return res
      .status(400)
      .render("login/login", {
        message: `Invalid request. The authorizarion token failed.`,
      });
  }

  //Create a local object so that you can access it from EJS views
  res.locals.req = req;
  res.locals.res = res;
  next();
};
