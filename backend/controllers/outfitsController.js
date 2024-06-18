const Outfit = require("../models/Outfits");

function getOutfits(req, res) {
  Outfit.all((err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "Outfits retrieved", outfits: rows });
  });
}

function getOutfit(req, res) {
  const { name } = req.param.name;
  Outfit.findByName(name, (err, outfit) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting outfit", error: err.message });
    }
    return res.status(200).json({
      message: "Outfit data succesfully retrieved, ",
      outfit: outfit,
    });
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

function updateOutfit(req, res) {
  const { name, newName, newFavorite } = req.params;

  if (!name) {
    return res
      .status(500)
      .json({ error: "Outfit name not passed in, unable to update" });
  }

  if (!newName && !newFavorite) {
    return res
      .status(500)
      .json({ error: "No new variables passed in, unable to update" });
  }

  Outfit.updateByName(name, newName, newFavorite, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error updating outfit", error: err.message });
    }
    return res.status(200).json({
      message: "Outfit data succesfully updated",
    });
  });
}

function deleteOutfit(req, res) {
  console.log("Deleting outfit");
  const { name } = req.params;
  console.log(name);
  Outfit.deleteByName(name, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting outfit", error: err.message });
    }
    return res.status(200).json({
      message: "Outfit data succesfully deleted",
    });
  });
}

module.exports = {
  getOutfits,
  getOutfit,
  updateOutfit,
  addOutfit,
  deleteOutfit,
};
