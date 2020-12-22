const ErrorLog = require("../mvc/models/northwind/logging/errorLog");
const RequestLog = require("../mvc/models/northwind/logging/requestLog");
const { config } = require("./common");

module.exports = {
  logError: async (sessionId, url, error, description) => {
    if (config.get("errorLogging")) {
      try {
        await new ErrorLog({
          sessionId: sessionId,
          url: url,
          errorTime: Date.now(),
          errorCode: error,
          errorDesc: description,
        }).save();
      } catch (ex) {
        console.log("Unhandlled error: " + ex);
      }
    }
  },

  logRequestProcessingTime: async (sessionId, url, startTime, endTime) => {
    if (config.get("requestLogging")) {
      try {
        await new RequestLog({
          url: url,
          startTime: startTime,
          endTime: endTime,
          responseTime: endTime - startTime,
          sessionId: sessionId,
        }).save();
      } catch (ex) {
        console.log("Unhandlled error: " + ex);
      }
    }
  },
};
