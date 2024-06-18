const db = require("../database/database");
const { deleteRecord, updateRecord, getAllRecords } = require("../utils/utils");
const tableName = "users";
class User {
  constructor(username, password, displayName) {
    this.username = username;
    this.password = password;
    this.displayName = displayName;
  }

  save(callback) {
    db.run(
      `INSERT INTO users (username, password, displayName) VALUES (?, ?, ?)`,
      [this.username, this.password, this.displayName],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  }

  verifyPassword(password) {
    return this.password === password;
  }

  static all(callback) {
    getAllRecords(tableName, callback);
  }

  static get(username, callback) {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
      if (err) {
        return callback(err);
      }
      if (row) {
        const user = new User(row.username, row.password, row.displayName);
        user.id = row.id;
        callback(null, user);
      } else {
        callback(null, null);
      }
    });
  }

  static update(username, password, displayName, callback) {
    const updates = {};
    if (username) updates.username = username;
    if (password) updates.password = password;
    if (displayName) updates.displayName = displayName;
    updateRecord(tableName, "username", username, updates, callback);
  }

  static delete(username, callback) {
    deleteRecord(tableName, "username", username, callback);
  }
}

module.exports = User;
