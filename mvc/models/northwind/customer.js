const mongooseDB = require("../../../dal/mongooseDB");

const Customer = mongooseDB.model(
  "Customer",
  new mongooseDB.Schema({
    CustomerID: {
      type: String,
      required: true,
    },
    CompanyName: {
      type: String,
      required: true,
    },
    ContactName: {
      type: String,
      required: true,
    },
    ContactTitle: {
      type: String,
    },
    Address: {
      type: Date,
    },
    City: {
      type: String,
    },
    Region: {
      type: String,
    },
    PostalCode: {
      type: Number,
    },
    Country: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
    },
    Fax: {
      type: String,
    },
    Picture: {
      type: Buffer,
    },
  })
);

module.exports = Customer;
