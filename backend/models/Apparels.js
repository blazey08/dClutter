const db = require("../database/database");

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
    db.all(`SELECT * FROM apparels`, (err, rows) => {
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
}

module.exports = {
  Apparel,
  apparelType,
};
