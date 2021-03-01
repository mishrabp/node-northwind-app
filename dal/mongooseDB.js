const mongooseDB = require("mongoose");
const { config } = require("../utility/common");

(async () => {
  try {
    console.log('authTokenSecretKey: ' + config.get("authTokenSecretKey"))
    console.log('MONGO_DB_URI: ' + config.get("MONGO_DB_URI"))
    await mongooseDB.connect(
      config.get("MONGO_DB_URI"),
      config.get("MONGO_DB.options")
    );
    console.log("mongoose database is successfully connected.");
  } catch (ex) {
    console.log(ex);
    process.exit(1);
  }
})();

module.exports = mongooseDB;
