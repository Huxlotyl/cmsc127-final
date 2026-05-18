import express from "express";
const router = express.Router();
import db from "../db.js";

// Fetch Registration data
router.get("/", (req, res) => {
  db.query("SELECT * FROM registration", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


router.get("/vehicles/expired-registration", (req, res) => {
  const query = `
    SELECT vehicle.*
    FROM vehicle
    JOIN registration
      ON vehicle.plateNo = registration.plateNo
    WHERE registration.expirationDate < CURDATE()
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});


export default router;