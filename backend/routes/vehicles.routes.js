import express from "express";
import db from "../db.js";
const router = express.Router();

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

router.get("/owners", (req, res) => {
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

router.get("/search", (req, res) => {
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

  router.get("/sort", (req, res) => {
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


// Update Vehicle
router.put("/:plateNo", (req, res) => {
  const { plateNo } = req.params;
  const {
    engineNo,
    color,
    licenseNo
  } = req.body;

  // validation - all fields are required
  if (!engineNo || !color || !licenseNo) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    UPDATE vehicle
    SET engineNo = ?, 
        color = ?, 
        licenseNo = ?
    WHERE plateNo = ?
  `;

  db.query(
    sql,
    [
      engineNo,
      color || null, // allow blank
      licenseNo,
      plateNo
    ],
    (err, result) => {
      if (err) {
        // Handle foreign key constraint errors
        if (err.code === "ER_ROW_IS_REFERENCED_2") {
          return res.status(409).json({ error: "Cannot update vehicle: plateNo is referenced in another table." });
        }
        console.error(err);
        return res.status(500).json({ error: "Failed to update vehicle" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      res.json({ message: "Vehicle updated successfully!" });
    }
  );
});

// Delete Vehicle
router.delete("/:plateNo", (req, res) => {
  const { plateNo } = req.params;

  const sql = "DELETE FROM vehicle WHERE plateNo = ?";
  db.query(sql, [plateNo], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete vehicle" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deleted successfully!" });
  });
});



export default router;