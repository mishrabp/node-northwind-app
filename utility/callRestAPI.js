const http = require("http");
const { config } = require("./common");
const querystring = require("querystring");

module.exports = {
  //url - service base url
  //endpoint - api endpoint
  //method - get or post
  //json - json data posted to the api. its null for get request
  //callback2 - is called when the function call is over.
  restApi: (endpoint, dataInput, method, successCallback) => {
    try {
      var dataString = JSON.stringify(dataInput);
      var headers = {};

      if (method == "GET") {
        endpoint += "?" + querystring.stringify(dataInput);
      } else {
        headers = {
          "Content-Type": "application/json",
          "Content-Length": dataString.length,
        };
      }
      var urlAddress = global.appHost.split(":");
      if(urlAddress.length === 2)
      {
        global.appBaseURL = urlAddress[0];
        global.appPort = urlAddress[1];
      }
      else
      {
        global.appBaseURL = global.appHost;
        global.appPort = "80";
      }
      var api_result = "";
      const options = {
        host: global.appBaseURL,
        port: global.appPort,
        path: endpoint,
        method: method,
        headers: headers,
      };

      const callbackInside = function (res) {
        const responseStatus = res.statusCode;
        res.setEncoding("utf-8");
        res.on("data", function (chuck) {
          //receiving response data in chuncks
          api_result += chuck;
        });
        res.on("end", function () {
          //response has fully been received.
          var responseObject = JSON.parse(api_result);
          successCallback(responseObject, responseStatus); //send the response back to the caller.
        });
      };

      const req = http.request(options, callbackInside);
      if (method != "GET") {
        req.write(dataString);
      }
      req.end();
    } catch (ex) {
      console.log(ex);
    }
  },
};
