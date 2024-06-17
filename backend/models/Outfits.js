const db = require("../database/database");

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
    db.all(`SELECT * FROM outfits`, (err, rows) => {
      if (err) {
        return callback(err);
      }
      if (rows) {
        callback(null, rows);
      } else {
        callback(null, null);
      }
    });
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
}

module.exports = Outfit;
