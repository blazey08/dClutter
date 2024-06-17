// Dashboard Routes
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Routes
router.get("/", dashboardController.getDashboard);

module.exports = router;
