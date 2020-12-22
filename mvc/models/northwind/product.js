const mongooseDB = require("../../../dal/mongooseDB");

const Product = mongooseDB.model(
  "Products",
  new mongooseDB.Schema({
    ProductID: {
      type: Number,
    },
    ProductName: {
      type: String,
    },
    SupplierID: {
      type: Number,
    },
    CategoryID: {
      type: Number,
    },
    QuantityPerUnit: {
      type: String,
    },
    UnitPrice: {
      type: Number,
    },
    UnitsInStock: {
      type: Number,
    },
    UnitsOnOrder: {
      type: Number,
    },
    ReorderLevel: {
      type: Number,
    },
    Discontinued: {
      type: Number,
    },
    Category: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Category",
    },
    Supplier: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Supplier",
    },
  })
);

module.exports = Product;
