const db = require("../database/database");

function getAllRecords(table, callback) {
  db.all(`SELECT * FROM ${table}`, (err, rows) => {
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

function updateRecord(table, column, value, updates, callback) {
  let sql = `UPDATE ${table} set`;
  const params = [];
  Object.keys(updates).forEach((key) => {
    sql += ` ${key} = ?,`;
    params.push(updates[key]);
  });

  sql = sql.slice(0, -1);
  sql += `WHERE ${column} = ?`;
  params.push(value);

  db.run(sql, params, function (err) {
    if (err) {
      return callback(err);
    } else {
      callback(null);
    }
  });
}

function deleteRecord(table, column, value, callback) {
  db.run(`DELETE FROM ${table} WHERE ${column} = ?`, [value], function (err) {
    if (err) {
      callback(`Failed to delete ${value} from ${table}: ` + err);
    } else if (this.changes === 0) {
      callback(`${value} not found in ${table}: ` + err);
    } else {
      callback(null);
    }
  });
}

module.exports = {
  getAllRecords,
  updateRecord,
  deleteRecord,
};
