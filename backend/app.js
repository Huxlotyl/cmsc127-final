import express from "express";
import cors from "cors";
import authRouter from "./auth/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
