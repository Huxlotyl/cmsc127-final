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

app.get("/vehicles/owners", (req, res) => {
  const owner = `%${req.query.owner}%`;
  const query = `
    SELECT vehicle.*
    FROM vehicle
    LEFT JOIN driver ON vehicle.licenseNo = driver.licenseNo
    WHERE driver.fullName LIKE ? 
    OR vehicle.licenseNo LIKE ?
  `;

  db.query(query, [owner, owner], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.get("/vehicles/search", (req, res) => {
  const search = `%${req.query.search}%`;
  const query = `
    SELECT *
    FROM vehicle
    WHERE plateNo LIKE ? 
    OR chassisNo LIKE ?
    OR engineNo LIKE ?
    OR color LIKE ?
    OR vehicleType LIKE ?
    OR make LIKE ?
    OR model LIKE ?
    OR year LIKE ?
  `;

  db.query(query, [search, search, search, search, search, search, search, search], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

  app.get("/vehicles/sort", (req, res) => {
    const sort = req.query.type;
    const validColumns = ["chassisNo", "engineNo", "color", "vehicleType", "make", "model", "year"];
    if (!validColumns.includes(sort)) {
      return res.json([]); 
    }

    const query = `
      SELECT *
      FROM vehicle
      ORDER BY ${sort} ASC
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      res.json(results);
    });
  });

  router.post("/", (req, res) => {
    const {
      plateNo,
      chassisNo,
      engineNo,
      color,
      vehicleType,
      make,
      model,
      year,
      licenseNo
    } = req.body;
  
    const sql = `
      INSERT INTO vehicle 
      (plateNo, chassisNo, engineNo, color, vehicleType, make, model, year, licenseNo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    db.query(sql, [plateNo, chassisNo, engineNo, color, vehicleType, make, model, year, licenseNo],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Failed to insert vehicle" });
        res.status(201).json({ message: "Vehicle added successfully!" });
      }
    );
  });

export default router;
