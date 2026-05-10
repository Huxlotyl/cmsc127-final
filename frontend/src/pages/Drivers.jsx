import React from "react";
import "../styles/Drivers.css";

const sampleDrivers = [
  {
    licenseNo: "N01-12345678901",
    fullName: "Juan Dela Cruz",
    birthdate: "1998-04-12",
    sex: "M",
    address: "Los Baños, Laguna",
    licenseType: "Non-Professional",
    licenseIssuance: "2024-01-10",
    licenseExpiration: "2029-01-10",
    licenseStatus: "Valid",
  },
  {
    licenseNo: "N02-98765432109",
    fullName: "Maria Santos",
    birthdate: "1995-09-20",
    sex: "F",
    address: "Calamba, Laguna",
    licenseType: "Professional",
    licenseIssuance: "2023-06-15",
    licenseExpiration: "2028-06-15",
    licenseStatus: "Valid",
  },
];

function Drivers() {
  console.log("Drivers page loaded");
  
  return (
    <div className="drivers-page">
      <div className="drivers-header">
        <div>
          <h1>Drivers</h1>
          <p>Manage driver records and license information.</p>
        </div>

        <button className="add-driver-btn">Add Driver</button>
      </div>

      <div className="drivers-table-container">
        <table className="drivers-table">
          <thead>
            <tr>
              <th>License No</th>
              <th>Full Name</th>
              <th>Birthdate</th>
              <th>Sex</th>
              <th>Address</th>
              <th>License Type</th>
              <th>Issuance</th>
              <th>Expiration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sampleDrivers.map((driver) => (
              <tr key={driver.licenseNo}>
                <td>{driver.licenseNo}</td>
                <td>{driver.fullName}</td>
                <td>{driver.birthdate}</td>
                <td>{driver.sex}</td>
                <td>{driver.address}</td>
                <td>{driver.licenseType}</td>
                <td>{driver.licenseIssuance}</td>
                <td>{driver.licenseExpiration}</td>
                <td>{driver.licenseStatus}</td>
                <td>
                  <button className="action-btn">Edit</button>
                  <button className="action-btn danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Drivers;