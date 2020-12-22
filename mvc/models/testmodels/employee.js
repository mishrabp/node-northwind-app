const mongooseDB = require("../../../dal/mongooseDB");

const employeeSchema = new mongooseDB.Schema({
  id: {
    type: Number,
    required: true, //this is mandatory
    min: 0,
    max: 100,
    get: (v) => {
      var s = v.toString();
      return String("000" + v).slice(-3);
    },
    set: (v) => {
      var s = v.toString();
      return String("000" + v).slice(-3);
    },
  },
  name: {
    type: String,
    required: true, //this is mandatory
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    validate: {
      //Custom validator
      validator: function (v) {
        return v.match(/.*@.*/);
      },
      message: "this must be a valid emailid ending with .com",
    },
    lowercase: true,
  },
});

const Employee = mongooseDB.model("Employee", employeeSchema);
module.exports = Employee;
