const db = require("../database/database");
const { deleteRecord, updateRecord, getAllRecords } = require("../utils/utils");
const tableName = "apparels";

const apparelType = {
  TOP: "Top",
  BOTTOM: "Bottom",
  SHOES: "Shoes",
  ACCESSORIES: "Accessories",
};

class Apparel {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  save(callback) {
    db.run(
      `INSERT INTO apparels (name, type) VALUES (?,?)`,
      [this.name, this.type],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  }

  static all(callback) {
    getAllRecords(tableName, callback);
  }

  static findByName(name, callback) {
    db.get(`SELECT * FROM apparels WHERE name = ?`, [name], (err, row) => {
      if (err) {
        return callback(err);
      }
      if (row) {
        const apparel = new Apparel(row.name, row.type);
        apparel.id = row.id;
        callback(null, apparel);
      } else {
        callback(null, null);
      }
    });
  }

  static updateByName(name, newName, newType, callback) {
    const updates = {};
    if (newName) updates.name = newName;
    if (newType) updates.type = newType;
    updateRecord(tableName, "name", name, updates, callback);
  }

  static deleteByName(name, callback) {
    deleteRecord(tableName, "name", name, callback);
  }
}

module.exports = {
  Apparel,
  apparelType,
};
