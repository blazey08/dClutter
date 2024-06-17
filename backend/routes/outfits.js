// Outfits Routes
const express = require("express");
const router = express.Router();
const outfitController = require("../controllers/outfitsController");

// Routes
router.get("/", outfitController.getOutfits);
router.post("/add", outfitController.addOutfit);

module.exports = router;
