import express from "express";
import cors from "cors";
import mysql from "mysql2";
import authRouter from "./auth/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "mlp",
  password: "model",
  database: "mlpmodel"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Connected to MariaDB");
});

// Fetch table data
app.get("/drivers", (req, res) => {
  db.query("SELECT * FROM driver", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.get("/vehicles", (req, res) => {
  db.query("SELECT * FROM vehicle", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.get("/registrations", (req, res) => {
  db.query("SELECT * FROM registration", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.get("/violations", (req, res) => {
  db.query("SELECT * FROM violation", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});




app.get("/drivers/suspended-expired", (req, res) => {
  const query = `
    SELECT *
    FROM driver
    WHERE licenseStatus IN ('suspended', 'expired')
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.get("/vehicles/expired-registration", (req, res) => {
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
