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