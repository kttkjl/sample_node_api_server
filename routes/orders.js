var express = require("express");
var router = express.Router();
var pool = require("../utils/db");

// Create a work order
router.post("/add", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let rows = await conn.query(
      `INSERT INTO orders (title, description, deadline) VALUES (
        '${req.body.title}',
        '${req.body.description}',
        '${req.body.deadline}'
      );`
    );
    conn.release();
    res.send(rows);
  } catch (e) {
    conn.release();
    res.send(e);
  }
});

// Assigning a worker to an order
router.put("/assign/:orderId/:workerId", async (req, res) => {
  let conn;
  let { orderId, workerId } = req.params;
  try {
    conn = await pool.getConnection();
    // This would work, but would not do anything useful (warn duplicate entries)
    // if condition met. Probably better to use two queries
    let rows = await conn.query(`
      INSERT INTO order_workers (order_id, worker_id)
      SELECT '${orderId}', '${workerId}'
        FROM DUAL
      WHERE (SELECT COUNT(*) FROM order_workers WHERE order_id=${orderId}) < 5;
    `);
    if (rows.affectedRows === 0) {
      throw {
        message: "Assigned worker is at max worker capacity or already exists.",
        code: "ER_FULL_OR_DUPLICATE"
      };
    }
    conn.release();
    res.send(rows);
  } catch (e) {
    conn.release();
    res.status(400).send(e);
  }
});

// Fetch all work orders
router.get("/all", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let rows = await conn.query(
      `SELECT * FROM orders
       ORDER BY deadline ASC
      ;`
    );
    conn.release();
    res.send(rows);
  } catch (e) {
    conn.release();
    res.send(e);
  }
});

module.exports = router;
