// Apparels Routes
const express = require("express");
const router = express.Router();
const apparelController = require("../controllers/apparelController");

// Routes
router.get("/", apparelController.getApparels);
router.post("/add", apparelController.addApparel);

module.exports = router;
