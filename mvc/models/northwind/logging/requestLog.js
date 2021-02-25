const mongooseDB = require("../../../../dal/mongooseDB");

const RequestLog = mongooseDB.model(
  "RequestLog",
  new mongooseDB.Schema({
    sessionId: {
      type: String,
      unique: true,
    },
    url: {
      type: String,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    responseTime: {
      type: Number,
    },
  })
);

module.exports = RequestLog;
