import React, { useState } from "react";
import "../../styles/Add_Driver.css";
import { IoCarOutline } from "react-icons/io5";

export default function AddVehicleDialog({ onClose }) {
  const [formData, setFormData] = useState({
    plateNo: "",
    chassisNo: "",
    engineNo: "",
    color: "",
    vehicleType: "",
    make: "",
    model: "",
    year: "",
    licenseNo: ""
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Field labels for alert
  const fieldLabels = {
    plateNo: "Plate Number",
    chassisNo: "Chassis Number",
    engineNo: "Engine Number",
    color: "Color",
    vehicleType: "Vehicle Type",
    make: "Make",
    model: "Model",
    year: "Year",
    licenseNo: "Owner's License No."
  };

  // Handle Add button click: validate required fields before showing confirmation alert
  const handleAddClick = () => {
    const requiredFields = [
      "plateNo",
      "chassisNo",
      "engineNo",
      "color",
      "vehicleType",
      "make",
      "model",
      "year",
      "licenseNo"
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${fieldLabels[field]} field.`);
        return; // stop if missing
      }
    }

    setShowAlert(true); // only show confirmation if all required fields are filled
  };

  // Success/Error alert
  const handleConfirm = async () => {
    try {
      const res = await fetch("http://localhost:5000/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Vehicle added successfully!");
        setShowAlert(false);
        onClose();
      } else {
        console.log()
        alert("Error adding vehicle.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the database.");
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="dialog-header">
          <IoCarOutline className="driver-icon" />
          <h2 className="driver-title">Vehicle Details</h2>
        </div>

        {/* Table Form */}
        <table className="driver-table">
          <tbody>
            {/* Plate Number */}
            <tr>
              <th>PLATE NO.</th>
              <td className="wide-cell" colSpan="3">
                <input
                  type="text"
                  name="plateNo"
                  value={formData.plateNo}
                  maxLength="7"
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* Chassis Number */}
            <tr>
              <th className="wide-cell">CHASSIS NO.</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="chassisNo"
                  value={formData.chassisNo}
                  maxLength = "17"
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* Engine Number */}
            <tr>
              <th className="wide-cell">ENGINE NO.</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="engineNo"
                  value={formData.engineNo}
                  maxLength="20"
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* Color and Vehicle Type */}
            <tr>
             <th>COLOR</th>
              <td className="birth-cell">
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </td>        
              <th>VEHICLE TYPE</th>
              <td className="vtype-cell">
                <select
                  className="sex-input"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                >
                  <option value="">Vehicle Type</option>
                  <option value="car">Passenger Car</option>
                  <option value="bus">Bus</option>
                  <option value="truck">Truck</option>
                  <option value="motorcycle">Motorcycle</option>
                </select>
              </td>
            </tr>

            {/* Make */}
            <tr>
              <th>MAKE</th>
              <td className="wide-cell" colSpan="3">
                <input
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* Model and Year */}
            <tr>
              <th>Model</th>
              <td className="birth-cell">
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                />
              </td>
              <th>Year</th>
              <td className="birth-cell">
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* License Issuance and Expiration */}
            <tr>
              <th>OWNER'S LICENSE NO.</th>
              <td className="wide-cell" colSpan="3">
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleChange}
                />
              </td>
            </tr>                
          </tbody>
        </table>

        {/* Footer */}
        <div className="dialog-footer">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="add-driver-btn" onClick={handleAddClick}>
            Add
          </button>
        </div>

        {/* Alert */}
        {showAlert && (
          <div className="alert-overlay" onClick={() => setShowAlert(false)}>
            <div className="alert" onClick={(e) => e.stopPropagation()}>
              <h3 className="alert-heading">ADD {formData.plateNo || "this vehicle"} TO VEHICLES?</h3>
              <p className ="alert-text">Please confirm that you want to add this vehicle to the database. Click outside to go back.</p>
              <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
