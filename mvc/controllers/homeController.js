const Customer = require("../models/northwind/customer");
const Product = require("../models/northwind/product");
const Supplier = require("../models/northwind/supplier");
const Order = require("../models/northwind/order");

module.exports = {
  index: async (req, res) => {
    var data = null;
    try {
      const pipelines = [
        {
          $group: {
            _id: 0,
            count: { $sum: 1 },
          },
        },
      ];

      const d1 = await Customer.aggregate(pipelines);
      const d2 = await Supplier.aggregate(pipelines);
      const d3 = await Product.aggregate(pipelines);
      const d4 = await Order.aggregate(pipelines);
      data = {
        customer: JSON.parse(JSON.stringify(d1))[0].count,
        supplier: JSON.parse(JSON.stringify(d2))[0].count,
        product: JSON.parse(JSON.stringify(d3))[0].count,
        order: JSON.parse(JSON.stringify(d4))[0].count,
      };
    } catch (ex) {
      console.log(ex);
    }
    res.render("home/index", { data: data });
  },
};
