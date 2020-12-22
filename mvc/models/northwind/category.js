const mongooseDB = require("../../../dal/mongooseDB");

const Category = mongooseDB.model(
  "Category",
  new mongooseDB.Schema({
    CategoryID: {
      type: Number,
      min: 1,
      max: 999,
      required: true,
      get: (v) => {
        var s = v.toString();
        return String("000" + v).slice(-3);
      },
    },
    CategoryName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    Description: {
      type: String,
      maxlength: 250,
    },
    Picture: {
      type: String,
    },
  })
);

module.exports = Category;
