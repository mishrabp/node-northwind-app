const express = require("express");
const router = express.Router();
const path = require("path");
const customerApi = require("../mvc/controllers/restapis/customer");
const loginApi = require("../mvc/controllers/restapis/login");
const core = require("../middleware/core");

//GET VERB
router.get("/customer", core, customerApi.get);
router.get("/login", loginApi.get);

//POST VERB
router.post("/register", loginApi.register);
router.post("/login", core, loginApi.login);

//PUT VERB

//DELET VERB

module.exports = router;
