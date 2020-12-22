const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //It an UTILITY to encrypt/decrypt passwords
const joi = require("joi"); //Its an UTILITY for input validation against a schema
const lodash = require("lodash"); //Its an UTILITY class that helps with

module.exports = {
  config: config,
  joi: joi,
  _: lodash,
  jwt: jwt,

  getAuthToken: (_id, name, role) => {
    const tokenKey = config.get("authTokenSecretKey") || "testtoken";
    return jwt.sign({ _id: _id, name: name, role: role }, tokenKey);
  },

  decodeAuthToken: (token) => {
    const tokenKey = config.get("authTokenSecretKey") || "testtoken";
    return jwt.verify(token, tokenKey);
  },

  encryptPassword: async (password) => {
    const salt = await bcrypt.genSalt(10); //generates hashing key
    const ret = await bcrypt.hash(password, salt); //encrypt the password using hashkey(salt)
    return ret;
  },

  decryptPassword: async (password, encryptedPassword) => {
    const isMatched = await bcrypt.compare(password, encryptedPassword);
    return isMatched;
  },
};
