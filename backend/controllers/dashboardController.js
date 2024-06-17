function getDashboard(req, res) {
  res.json({ message: "Dashboard data retrieved" });
}

module.exports = {
  getDashboard,
};
