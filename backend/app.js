import express from "express";
import cors from "cors";
import authRouter from "./auth/auth.routes.js";
import driversRouter from "./routes/drivers.routes.js";
import vehiclesRouter from "./routes/vehicles.routes.js";
import registrationsRouter from "./routes/registrations.routes.js";
import violationsRouter from "./routes/violations.routes.js";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Connected to MariaDB");
});

// Mount routes
app.use("/auth", authRouter);
app.use("/drivers", driversRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/registrations", registrationsRouter);
app.use("/violations", violationsRouter);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});




