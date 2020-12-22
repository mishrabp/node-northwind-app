const mongooseDB = require("../../../../dal/mongooseDB");
const { joi, _, config, jwt } = require("../../../../utility/common");

const userSchema = new mongooseDB.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    match: /.*@.*/,
  },
  role: {
    type: String,
    required: true,
    enum: ["Operator", "Guest", "Admin"],
  },
});

userSchema.methods.generateAuthToken = function () {
  const tokenKey = config.get("authTokenSecretKey") || "testtoken";
  return jwt.sign(
    { _id: this._id, name: this.name, role: this.role },
    tokenKey
  );
};

const User = mongooseDB.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: joi.string().min(5).max(100).required(),
    password: joi.string().min(5).max(100).required(),
    email: joi.string().min(5).max(100).required().match(/.*@.*/),
  };
  return joi.valid(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
