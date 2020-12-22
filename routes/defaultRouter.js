const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
const path = require("path");
const homeController = require("../mvc/controllers/homeController");
const customerController = require("../mvc/controllers/customerController");
const loginController = require("../mvc/controllers/loginController");
const aboutController = require("../mvc/controllers/aboutController");
const messageController = require("../mvc/controllers/messageController");
const taskController = require("../mvc/controllers/taskController");
const locationController = require("../mvc/controllers/locationController");
const paymentController = require("../mvc/controllers/paymentController");
const core = require("../middleware/core");


//set the middleware to use default template
router.all("/*", (req, res, next) => {
  req.app.set("layout", "_layouts/default");
  next();
});

//GET VERB
//we are passing two middleware functions here.
//auth middleware authorizes the request
//controller middleware routes the request in the right direction.
router.get("/", auth, aboutController.index);
router.get("/index", auth, aboutController.index);
router.get("/home", auth, aboutController.index);
router.get("/about", auth, aboutController.index);

router.get("/analytics", auth, homeController.index);
router.get("/customer", auth, admin, customerController.index);
router.get("/task", auth, taskController.index);
router.get("/message", auth, messageController.index);
router.get("/payment", auth, paymentController.index);
router.get("/location", auth, locationController.index);

router.get("/login", loginController.login);
router.get("/logout", loginController.logout);
router.get("/register", loginController.register);
router.get("/passwordChange", auth, loginController.passwordChange);
router.get("/passwordReset", loginController.passwordReset);

//POST VERB
router.post("/login", loginController.loginUser);
router.post("/register", loginController.registerUser);
router.post("/passwordChange", auth, loginController.passwordChangePost);
router.post("/passwordReset", loginController.passwordResetPost);

//PUT VERB

//DELET VERB

module.exports = router;
