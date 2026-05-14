import express from "express";
const router = express.Router();
import db from "../db.js";

// Fetch Vehicle data
router.get("/", (req, res) => {
  db.query("SELECT * FROM vehicle", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

export default router;