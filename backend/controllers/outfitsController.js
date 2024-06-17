const Outfit = require("../models/Outfits");

function getOutfits(req, res) {
  Outfit.all((err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "Outfits retrieved", outfits: rows });
  });
}

function addOutfit(req, res) {
  console.log("Adding new outfit...");
  const { name, favorite } = req.body;
  const newOutfit = new Outfit(name, favorite);
  newOutfit.save((err, outfitId) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error adding outfit", error: err.message });
    }
    return res
      .status(200)
      .json({ message: "Outfit succesfully added, ", outfitId: outfitId });
  });
}

module.exports = {
  getOutfits,
  addOutfit,
};
