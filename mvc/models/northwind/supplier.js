const mongooseDB = require("../../../dal/mongooseDB");

const Supplier = mongooseDB.model(
  "Supplier",
  new mongooseDB.Schema({
    SupplierID: {
      type: Number,
    },
    CompanyName: {
      type: String,
    },
    ContactName: {
      type: String,
    },
    ContactTitle: {
      type: String,
    },
    Address: {
      type: String,
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
    },
    Phone: {
      type: String,
    },
    Fax: {
      type: String,
    },
    HomePage: {
      type: String,
    },
  })
);

module.exports = Supplier;
