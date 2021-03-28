//this middleware is for request and error tracking.

const logger = require("../utility/logger");

module.exports = {
  error400Handler: function (req, res, next) {
    logger.logError(req.sessionID, req.url, 404, "Page not found");
    req.app.set("layout", "_layouts/error");
    return res.status(404).render("error/400");
    //res.status(404).sendFile(process.cwd()+'/public/static/404.html');
  },

  error500Handler: function (error, req, res, next) {
    logger.logError(req.sessionID, req.url, error.status, error);
    req.app.set("layout", "_layouts/error");
    console.log(req.url.url);
    if (req.url.indexOf("/api") > -1) {
      //send a text error to restapi calls
      console.log(error);
      return res.status(error.status || 500).send(error);
    } else {
      return res
        .status(error.status || 500)
        .render("error/500", { message: error });
    }
    //res.status(error.status || 500).sendFile(process.cwd()+'/public/static/500.html');
  },

  recordResponseTime: function (req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    console.log('request received.');
    global.appHost = req.headers.host;
    const startTime = Date.now();
    res.on("finish", function () {
      console.log('response sent.');
      //log the request start,end and processing time
      logger.logRequestProcessingTime(
        req.sessionID,
        req.url,
        startTime,
        Date.now()
      );
    });
    next();
  },
};
