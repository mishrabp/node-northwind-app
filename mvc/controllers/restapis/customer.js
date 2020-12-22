const Customer = require("../../models/northwind/customer");

const getapi = async function (req, res) {
  var customers = null;
  try {
    customers = await Customer.find();
  } catch (ex) {
    console.log(ex);
  }
  return customers;
};

module.exports = {
  get: async (req, res) => {
    var retValue = "";
    var retCode = 200;
    try {
      const customers = await getapi(req, res);
      retValue = { message: "success", data: customers };
    } catch (ex) {
      console.log(ex);
      retValue = { message: ex.message, data: null };
      retCode = 400;
    }
    res.status(retCode).send(retValue);
  },
};
