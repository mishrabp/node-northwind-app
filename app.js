const express = require("express"); 
const compression = require("compression");
const expressLayouts = require("express-ejs-layouts");
const app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
const { config } = require("./utility/common");
//const config = require("config");
const tracker = require("./middleware/tracker");
const core = require('./middleware/core');

console.log("Web server is starting...................");

/************************Setting Validation****************************/
console.log("Reading environment setups................");


console.log('authTokenSecretKey: ' + config.get("authTokenSecretKey"))
console.log('MONGO_DB_URI: ' + config.get("MONGO_DB_URI"))

if (!config.get("sessionSecretKey")) {
  console.log("FATAL ERROR: session key is not defined");
  process.exit(1);
}
if (!config.get("authTokenSecretKey")) {
  console.log("FATAL ERROR: auth token key is not defined");
  process.exit(1);
}

console.log("Setting up middlwares to parse HTTP requests................");

/**********************Configure Session, caching and compression*******/
console.log("Setting up middlwares to parse HTTP requests................");
app.use(cookieParser());
/* app.use(session({
    secret: config.get("sessionSecretKey"), // just a long random string
    resave: false,
    saveUninitialized: true
})); */

app.use(
  compression({
    level: 6, //default level is -1. It ranges from -1 to 9.
    threshold: 1 * 1000, //anything below 1000bytes/1KB will not be compressed.
    filter: shouldCompress,
  })
);
function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}

/**********************Configure the Middlewares***********************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//app.use(express.static("public/WebWorkerExample"));
//app.use(express.static('public/static'));
app.use(expressLayouts);
//custom middleware. you can write your own piece of code here
app.use(tracker.recordResponseTime);

/**********************Configure the View Engine**********************/
app.set("view engine", "ejs"); //set the view engine
app.set("views", "./mvc/views"); //this is optional. unless it is specified, the engine looks for default path ./views

/**********************Configure the Routes*************************/
const defaultRouter = require("./routes/defaultRouter");
const apiRouter = require("./routes/apiRouter");
app.use("/", defaultRouter);
app.use("/api", core, apiRouter);

/**********************Configure the Error Hndlers*******************/
// it catches 404 page not found error
app.use(tracker.error400Handler);
// it catches any 500 system error
app.use(tracker.error500Handler);

/**********************Load Startup Scripts**************************/
console.log("Executing startup scripts................");
require("./startup/prod")(app);

//console.log(req.url);

module.exports = app;
