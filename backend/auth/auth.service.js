import fs from "fs";
import csv from "csv-parser";

export const findUser = (employeeID, password) => {
  return new Promise((resolve, reject) => {
    const users = [];

    fs.createReadStream("./data/users.csv")
      .pipe(csv())
      .on("data", (row) => {
        // Clean any trailing spaces from the csv
        const normalized = {
          EmployeeID: row.EmployeeID?.trim(),
          FirstName: row.FirstName?.trim(),
          LastName: row.LastName?.trim(),
          Password: row["Password "]?.trim() || row.Password?.trim()
        };
        users.push(normalized);
      })
      .on("end", () => {
        const user = users.find(
          (u) =>
            u.EmployeeID === employeeID.trim() &&
            u.Password === password.trim()
        );
        resolve(user);
      })
      .on("error", reject);
  });
};
