import express from "express";
const router = express.Router();
import db from "../db.js";

// Fetch Driver data
router.get("/", (req, res) => {
  const { licenseStatus, sex, licenseType, ageRange } = req.query;

  let sql = "SELECT * FROM driver";
  let conditions = [];
  let values = [];

  // FILTERS ===========================

  // License Status filter
  if (licenseStatus) {
    conditions.push("licenseStatus = ?");
    values.push(licenseStatus);
  }

  // Sex filter
  if (sex) {
    conditions.push("sex = ?");
    values.push(sex);
  }

  // License Type filter
  if (licenseType) {
    conditions.push("licenseType = ?");
    values.push(licenseType);
  }

  // Age Range filter
  if (ageRange === "18-25") {
    conditions.push(`
      TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 18 AND 25
    `);
  }

  else if (ageRange === "26-35") {
    conditions.push(`
      TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 26 AND 35
    `);
  }

  else if (ageRange === "36-45") {
    conditions.push(`
      TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 36 AND 45
    `);
  }

  else if (ageRange === "46-60") {
    conditions.push(`
      TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) BETWEEN 46 AND 60
    `);
  }

  else if (ageRange === "61+") {
    conditions.push(`
      TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) >= 61
    `);
  }

  // Add WHERE clause if conditions exist
  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  db.query(sql, values, (err, results) => {
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
