const Customer = require("../models/northwind/customer");
const api = require("../../utility/callRestAPI");

module.exports = {
  index: async (req, res) => {
    api.restApi("/api/customer", {}, "GET", (responseObject, status) => {
      //console.log("customer record count:" + responseObject.data.length);
      res
        .status(status)
        .render("customer/index", { customers: responseObject.data });
    });
  },
};
