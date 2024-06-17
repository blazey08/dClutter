const db = require("../database/database");

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

  verifyPassword(password) {
    return this.password === password;
  }
}

module.exports = User;
