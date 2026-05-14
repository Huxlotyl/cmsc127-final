import express from "express";
const router = express.Router();
import db from "../db.js";

// Fetch Driver data
router.get("/", (req, res) => {
  db.query("SELECT * FROM driver", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Post new Driver
router.post("/", (req, res) => {
  const {
    licenseNo,
    fullName,
    birthdate,
    sex,
    address,
    licenseType,
    licenseIssuance,
    licenseExpiration,
    licenseStatus
  } = req.body;

  const sql = `
    INSERT INTO driver 
    (licenseNo, fullName, birthdate, sex, address, licenseType, licenseIssuance, licenseExpiration, licenseStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [licenseNo, fullName, birthdate, sex, address, licenseType, licenseIssuance, licenseExpiration, licenseStatus],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to insert driver" });
      res.status(201).json({ message: "Driver added successfully!" });
    }
  );
});

export default router;
