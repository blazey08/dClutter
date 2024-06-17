// Index Routes
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.get("/", (req, res) => {
  console.log("Starting up homepage");
  res.send("Welcome to the homepage!");
});

router.post("/login", loginController.login);
router.post("/register", loginController.registerUser);

module.exports = router;
