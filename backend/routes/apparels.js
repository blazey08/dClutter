// Apparels Routes
const express = require("express");
const router = express.Router();
const apparelController = require("../controllers/apparelController");

// Routes
router.get("/", apparelController.getApparels);
router.get("/:name", apparelController.getApparel);
router.post("/add", apparelController.addApparel);
router.put("/:name", apparelController.updateApparel);
router.delete("/:name", apparelController.deleteApparel);

module.exports = router;
