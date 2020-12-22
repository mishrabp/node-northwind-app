const mongooseDB = require("mongoose");
const { config } = require("../utility/common");

(async () => {
  try {
    //console.log(config.get('database.connectionString'));
    await mongooseDB.connect(
      config.get("database.connectionString"),
      config.get("database.options")
    );
    console.log("mongoose database is successfully conneected.");
  } catch (ex) {
    console.log(ex);
    process.exit(1);
  }
})();

module.exports = mongooseDB;
