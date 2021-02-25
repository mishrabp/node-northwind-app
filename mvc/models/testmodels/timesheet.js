const mongooseDB = require("../../../dal/mongooseDB");

const timesheetSchema = new mongooseDB.Schema({
  day: {
    type: Date,
    required: true, //this is mandatory
  },
  hours: {
    type: Number,
    required: true, //this is mandatory
    min: 0,
    max: 8,
  },
  activity: {
    type: String,
    required: true,
  },
});

module.exports = { Timesheet: mongooseDB.model("Timsheet", timesheetSchema) };
