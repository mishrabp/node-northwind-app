const mongooseDB = require("../../../dal/mongooseDB");

const OrderDetail = mongooseDB.model(
  "order-detail",
  new mongooseDB.Schema({
    OrderID: {
      type: Number,
    },
    ProductID: {
      type: Number,
    },
    UnitPrice: {
      type: Number,
    },
    Quantity: {
      type: Number,
    },
    Discount: {
      type: Number,
    },
    Order: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Order",
    },
    Product: {
      type: mongooseDB.Schema.Types.ObjectId,
      ref: "Product",
    },
  })
);

module.exports = OrderDetail;
