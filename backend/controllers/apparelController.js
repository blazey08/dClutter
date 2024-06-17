const Apparel = require("../models/Apparels");

function getApparels(req, res) {
  Apparel.all((err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "Apparels retrieved", apparels: rows });
  });
}

function addApparel(req, res) {
  console.log("Adding new apparel...");
  const { name, type } = req.body;
  const newApparel = new Apparel(name, type);
  newApparel.save((err, apparelId) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error adding apparel", error: err.message });
    }
    return res
      .status(200)
      .json({ message: "Apparel succesfully added, ", apparelId: apparelId });
  });
}

module.exports = {
  getApparels,
  addApparel,
};
