const mariadb = require("mariadb");

// Use this database
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "testing1",
  database: "sample_be",
  connectionLimit: 5
});

module.exports = pool;
