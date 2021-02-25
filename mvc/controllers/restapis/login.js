const { User, validate } = require("../../models/northwind/login/user");
const common = require("../../../utility/common");

module.exports = {
  get: async (req, res) => {
    try {
      const users = await User.find().sort("name");
      res.send(users);
    } catch (ex) {
      console.log(ex);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      var retValue = "";
      var retCode = 200;
      var authToken = null;
      if (user != null) {
        const validPassword = await common.decryptPassword(
          req.body.password,
          user.password
        );
        if (validPassword) {
          authToken = user.generateAuthToken();
          retValue = {
            message: "User is successfully authenticated",
            data: user,
            authToken: authToken,
          };
        } else {
          retValue = {
            message: "Password is not matching.",
            data: null,
            authToken: null,
          };
          retCode = 401;
        }
      } else {
        retValue = {
          message: "User is not found",
          data: null,
          authToken: null,
        };
        retCode = 401;
      }
    } catch (ex) {
      retValue = { message: ex.message, data: null, authToken: null };
      console.log(ex);
    }
    res.status(retCode).send(retValue);
  },
  register: async (req, res) => {
    var retValue = "";
    var retCode = 200;
    var authToken = null;
    try {
      let user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role: "Operator",
      });
      user.password = await common.encryptPassword(user.password); //encrypt the password using hashkey(salt)
      await user.save();
      authToken = user.generateAuthToken();
      retValue = {
        message: "successfully registered.",
        data: user,
        authToken: authToken,
      };
    } catch (ex) {
      retValue = { message: ex.message, data: null, authToken: null };
      retCode = 400;
      console.log(ex);
    }
    res.status(retCode).send(retValue);
  },
};
