const mongooseDB = require("../../../dal/mongooseDB");

const Order = mongooseDB.model(
  "Order",
  new mongooseDB.Schema({
    OrderID: {
      type: Number,
    },
    CustomerID: {
      type: String,
    },
    EmployeeID: {
      type: Number,
    },
    OrderDate: {
      type: Date,
    },
    RequiredDate: {
      type: Date,
    },
    ShippedDate: {
      type: Date,
    },
    ShipVia: {
      type: Number,
    },
    Freight: {
      type: Number,
    },
    ShipName: {
      type: String,
    },
    ShipAddress: {
      type: String,
    },
    ShipCity: {
      type: String,
    },
    ShipRegion: {
      type: String,
    },
    ShipPostalCode: {
      type: Number,
    },
    ShipCountry: {
      type: String,
    },
    Customer: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Customer",
    },
  })
);

module.exports = Order;
