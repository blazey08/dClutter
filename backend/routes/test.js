const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Populating sqlite DB with data...");
});

module.exports = router;
