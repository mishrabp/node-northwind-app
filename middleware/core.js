//Enabling CORS - Cross Origin Resource Sharing (CORS) in Node. CORS essentially means cross-domain requests.
module.exports = function (req, res, next) {
  // Website you wish to allow to connect
  //res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");
  //const origins = ["*", "http://localhost", "http://localhost:8080", null];
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,x-auth-token"
  );
  //res.setHeader("Access-Control-Allow-Headers", "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
};
