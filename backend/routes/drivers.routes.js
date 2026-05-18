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

// Add new Driver
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

// Update Driver
router.put("/:licenseNo", (req, res) => {
  const { licenseNo } = req.params;
  const {
    fullName,
    birthdate,
    sex,
    address,
    licenseType,
    licenseIssuance,
    licenseExpiration,
    licenseStatus
  } = req.body;

  // validation - all except address must be filled
  if (!fullName || !birthdate || !sex || !licenseType || !licenseIssuance || !licenseExpiration || !licenseStatus) {
    return res.status(400).json({ error: "All fields except address are required." });
  }

  const sql = `
    UPDATE driver
    SET fullName = ?, 
        birthdate = ?, 
        sex = ?, 
        address = ?, 
        licenseType = ?, 
        licenseIssuance = ?, 
        licenseExpiration = ?, 
        licenseStatus = ?
    WHERE licenseNo = ?
  `;

  db.query(
    sql,
    [
      fullName,
      birthdate,
      sex,
      address || null, // allow blank
      licenseType,
      licenseIssuance,
      licenseExpiration,
      licenseStatus,
      licenseNo
    ],
    (err, result) => {
      if (err) {
        // ADJUST WHEN OTHER TABLES ARE ADDED
        // Handle foreign key constraint errors
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
          return res.status(409).json({ error: "Cannot update driver: licenseNo is referenced in another table." });
        }
        console.error(err);
        return res.status(500).json({ error: "Failed to update driver" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Driver not found" });
      }
      res.json({ message: "Driver updated successfully!" });
    }
  );
});


// Delete Driver
router.delete("/:licenseNo", (req, res) => {
  const { licenseNo } = req.params;

  const sql = "DELETE FROM driver WHERE licenseNo = ?";
  db.query(sql, [licenseNo], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete driver" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.json({ message: "Driver deleted successfully!" });
  });
});

export default router;