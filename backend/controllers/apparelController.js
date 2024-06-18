const Apparel = require("../models/Apparels");

function getApparels(req, res) {
  Apparel.all((err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Unable to load all apparels", error: err });
    }
    res.status(200).json({ apparels: rows });
  });
}

function getApparel(req, res) {
  const { name } = req.params.name;
  Apparel.findByName(name, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting apparel: " + name, error: err });
    }
    return res.status(200).json({ apparel: data });
  });
}

function addApparel(req, res) {
  const { name, type } = req.body;
  const newApparel = new Apparel(name, type);
  newApparel.save((err, apparelId) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error adding apparel", error: err.message });
    }
    return res.status(200).json({ apparelId: apparelId });
  });
}

function updateApparel(req, res) {
  const name = req.params;
  const { newName, newType } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ error: "Please input apparel name to update" });
  }

  if (!newName && !newType) {
    return res.status(400).json({
      error: "There's nothing to update, please pass in a newName or newType",
    });
  }

  Apparel.updateApparel(name, newName, newType, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error updating apparel: " + name,
        error: err.message,
      });
    }
  });
  return res
    .status(200)
    .json({ message: "Apparel successfully updated: " + name });
}

function deleteApparel(req, res) {
  const name = req.params;
  Apparel.deleteByName(name, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting apparel", error: err.message });
    }
    return res
      .status(200)
      .json({ message: "Apparel successfully deleted: " + name });
  });
}

module.exports = {
  getApparels,
  getApparel,
  addApparel,
  updateApparel,
  deleteApparel,
};
