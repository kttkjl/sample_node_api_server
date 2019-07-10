var express = require("express");
var router = express.Router();
var pool = require("../utils/db");

// Create a worker
router.post("/", async (req, res) => {
  let conn;
  console.log("creating worker...");
  try {
    conn = await pool.getConnection();
    let rows = await conn.query(`
      SELECT id FROM workers WHERE email="${req.body.email}";
    `);
    if (Object.keys(rows).length > 1) {
      throw { code: "ER_DUP_ENTRY" };
    }
    rows = await conn.query(`
      INSERT INTO workers (name, company_name, email) VALUES (
        '${req.body.name}',
        '${req.body.company_name}',
        '${req.body.email}'
      );
    `);
    res.send(rows);
    conn.release();
  } catch (e) {
    res.status(400).send(e.code);
    conn.release();
  }
});

// Delete a worker
router.delete("/:workerId", async (req, res) => {
  try {
    conn = await pool.getConnection();
    console.log(req.params);
    let rows = await conn.query(`
      DELETE FROM workers WHERE id="${req.params.workerId}";
    `);
    conn.release();
    res.status(200).send(rows);
  } catch (e) {
    conn.release();
    res.status(400).send(e.code);
  }
});

module.exports = router;
