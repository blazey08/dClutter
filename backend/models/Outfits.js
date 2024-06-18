const db = require("../database/database");
const { deleteRecord, updateRecord, getAllRecords } = require("../utils/utils");
const tableName = "outfits";

class Outfit {
  constructor(name, favorite) {
    this.name = name;
    this.favorite = favorite;
  }

  save(callback) {
    db.run(
      `INSERT INTO outfits (name, favorite) VALUES (?,?)`,
      [this.name, this.favorite],
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
    db.get(`SELECT * FROM outfits WHERE name = ?`, [name], (err, row) => {
      if (err) {
        return callback(err);
      }

      if (row) {
        const outfit = new Outfit(row.name, row.favorite);
        outfit.id = row.id;
        callback(null, outfit);
      } else {
        callback(null, null);
      }
    });
  }

  static updateByName(name, newName, newFavorite, callback) {
    const updates = {};
    if (newName) updates.name = newName;
    if (newFavorite) updates.favorite = newFavorite;
    updateRecord(tableName, "name", name, updates, callback);
  }

  static deleteByName(name, callback) {
    deleteRecord(tableName, "name", name, callback);
  }
}

module.exports = Outfit;
