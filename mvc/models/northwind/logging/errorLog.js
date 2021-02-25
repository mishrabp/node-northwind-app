const mongooseDB = require("../../../../dal/mongooseDB");

const ErrorLog = mongooseDB.model(
  "ErrorLog",
  new mongooseDB.Schema({
    sessionId: {
      type: String,
    },
    url: {
      type: String,
    },
    errorTime: {
      type: Date,
    },
    errorCode: {
      type: String,
    },
    errorDesc: {
      type: String,
    },
  })
);

module.exports = ErrorLog;
