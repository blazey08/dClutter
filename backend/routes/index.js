// Index Routes
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", (req, res) => {
  console.log("Starting up homepage");
  res.send("Welcome to the homepage!");
});

router.post("/login", loginController.login);

// User related routes
router.get("/user/:name", loginController.getUser);
router.get("/users", loginController.getUsers);
router.post("/user/register", loginController.registerUser);
router.delete("/user/:name", loginController.deleteUser);

module.exports = router;
