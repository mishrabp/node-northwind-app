const api = require("../../utility/callRestAPI");
const homeController = require("./homeController");
const common = require("../../utility/common");

module.exports = {
  login: async (req, res) => {
    req.app.set("layout", "_layouts/login");
    res.render("login/login", { message: null });
  },
  loginUser: async (req, res) => {
    const dataInput = {
      password: req.body.password,
      email: req.body.email,
    };
    api.restApi(
      "/api/login",
      dataInput,
      "POST",
      (responseObject, responseStatus) => {
        res.status(responseStatus);
        if (responseObject.data) {
          res.setHeader("x-auth-token", responseObject.authToken);
          res.cookie("token", responseObject.authToken, {
            expires: new Date(Date.now() + 604800000),
            secure: false, // set to true if your using https
            httpOnly: true,
          });
          req.user = common.decodeAuthToken(responseObject.authToken);
          res.locals.req = req;
          homeController.index(req, res);
        } else {
          req.app.set("layout", "_layouts/login");
          res
            .header("x-auth-token", null)
            .render("login/login", { message: responseObject.message });
        }
      }
    );
  },
  register: async (req, res) => {
    req.app.set("layout", "_layouts/login");
    res.render("login/register", { user: null, message: null });
  },
  registerUser: async (req, res) => {
    const dataInput = {
      name: req.body.fname + " " + req.body.lname,
      password: req.body.password,
      email: req.body.email,
    };
    api.restApi(
      "/api/register",
      dataInput,
      "POST",
      (responseObject, responseStatus) => {
        req.app.set("layout", "_layouts/login");
        res.cookie("token", responseObject.authToken, {
          expires: new Date(Date.now() + 604800000),
          secure: false, // set to true if your using https
          httpOnly: true,
        });
        req.user = responseObject.user;
        res.locals.req = req;
        res
          .header("x-auth-token", responseObject.authToken)
          .status(responseStatus)
          .render("login/register", { user: responseObject.user, message:responseObject.message });
      }
    );
  },
  passwordChange: async (req, res) => {
    res.render("login/passwordChange");
  },
  passwordChangePost: async (req, res) => {
    res.render("login/passwordChange");
  },
  passwordReset: async (req, res) => {
    req.app.set("layout", "_layouts/login");
    res.render("login/passwordReset");
  },
  passwordResetPost: async (req, res) => {
    req.app.set("layout", "_layouts/login");
    res.render("login/passwordReset");
  },
  logout: async (req, res) => {
    //remove token from cookie
    res.cookie("token", null, {
      expires: new Date(Date.now() - 10000),
      secure: false, // set to true if your using https
      httpOnly: true,
    });
    req.app.set("layout", "_layouts/login");
    res.render("login/login", { message: "You have successfully logged out." });
  },
};
