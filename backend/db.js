import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "mlp",
  password: "model",
  database: "mlpmodel"
});

export default db;