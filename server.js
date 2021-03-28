//@ts-check 

const app = require("./app"); //import app.
//const https = require("https");
//var fs = require("fs");

const port = process.env.MYNWAPP_PORT || 3000;
//const sslport = process.env.SSLPORT || 8080;

//Start the server listening to SSL port
var server = app.listen(port, () => {
  console.log(
    `server is listening on port ${port} [${process.env.MYNWAPP_ENV}]. http://localhost:${port}`
  );
});


//Start the server listening to SSL port
//register the private and public key with the server.
/* var serverssl = https.createServer({
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.cert')
  }, app)
  .listen(sslport, function () {
    console.log(`server is listening on port ${serverssl.address().port} [${process.env.ENVIRONMENT}]. https://localhost:${serverssl.address().port}`)
  }); */
