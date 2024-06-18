// Outfits Routes
const express = require("express");
const router = express.Router();
const outfitController = require("../controllers/outfitsController");

// Routes
router.get("/", outfitController.getOutfits);
router.get("/:name", outfitController.getOutfit);
router.post("/add", outfitController.addOutfit);
router.put("/:name", outfitController.updateOutfit);
router.delete("/:name", outfitController.deleteOutfit);

module.exports = router;
