import React, { useState, useEffect } from "react";
import "../../styles/Add_Driver.css";
import { IoCarOutline } from "react-icons/io5";

export default function EditVehicleDialog({ vehicle, onClose, refreshVehicles }) {
  const normalizeStatus = (status) => {
  console.log("RAW STATUS:", JSON.stringify(status));

  if (status == null) return "";

  const cleaned = String(status)
    .replace(/\r/g, "")
    .replace(/\n/g, "")
    .trim()
    .toLowerCase();

  console.log("CLEANED STATUS:", cleaned);

  switch (cleaned) {
    case "passenger cars":
      return "Passenger Cars";
    case "truck":
      return "Truck";
    case "bus":
      return "Bus";
    case "motorcycle":
      return "Motorcycle";
    default:
      return "";
  }
};

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (vehicle) {
      setFormData({
        ...vehicle,
        vehicleType: normalizeStatus(vehicle.vehicleType)
      });
    }
  }, [vehicle]);

  const [editable, setEditable] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleChange = (e) => {
    if (editable) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  // Validation
  const fieldLabels = {
    plateNo: "Plate Number",
    chassisNo: "Chassis Number",
    engineNo: "Engine Number",
    color: "Color",
    vehicleType: "Vehicle Type",
    make: "Make",
    model: "Model",
    year: "Year",
    licenseNo: "License Number",
  };

  const validateFields = () => {
    const requiredFields = [
      "engineNo",
      "color",
      "licenseNo"
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${fieldLabels[field]} field.`);
        return false;
      }
    }

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill out the ${fieldLabels[field]} field.`);
        return false;
      }
    }
    return true;
  };

  // Save changes
  const handleSave = async () => {
    if (!validateFields()) return;
    try {
      const res = await fetch(`http://localhost:5000/vehicles/${vehicle.plateNo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Vehicle details updated successfully!");
        refreshVehicles();
        onClose();
      } else {
        alert("Error updating vehicle.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the database.");
    }
  };

  // Delete vehicle
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/vehicles/${vehicle.plateNo}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Vehicle deleted successfully!");
        refreshVehicles();
        onClose();
      } else {
        alert("Error deleting vehicle.");
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={!editable}
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
                  disabled={!editable}
                />
              </td>        
              <th>VEHICLE TYPE</th>
              <td className="vtype-cell">
                <select
                  className="sex-input"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  disabled={true}
                >
                  <option value="">Vehicle Type</option>
                  <option value="Passenger Car">Passenger Car</option>
                  <option value="Bus">Bus</option>
                  <option value="Truck">Truck</option>
                  <option value="Motorcycle">Motorcycle</option>
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
                  disabled={true}
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
                  disabled={true}
                />
              </td>
              <th>Year</th>
              <td className="birth-cell">
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  disabled={true}
                />
              </td>
            </tr>

            {/* Owner's License Number */}
            <tr>
              <th>OWNER'S LICENSE NO.</th>
              <td className="wide-cell" colSpan="3">
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleChange}
                  disabled={!editable}
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
          {!editable ? (
            <button type="button" className="add-driver-btn" onClick={() => setShowEditAlert(true)}>
              Edit
            </button>
          ) : (
            <button type="button" className="add-driver-btn" onClick={handleSave}>
              Save
            </button>
          )}
          <button type="button" className="cancel-btn" onClick={() => setShowDeleteAlert(true)}>
            Delete
          </button>
        </div>

        {/* Edit Alert */}
        {showEditAlert && (
          <div className="alert-overlay" onClick={() => setShowEditAlert(false)}>
            <div className="alert" onClick={(e) => e.stopPropagation()}>
              <h3 className="alert-heading">Edit {formData.plateNo || "this vehicle"}'s Details</h3>
              <p className="alert-text">You are about to edit this vehicle's details. Press Continue to proceed.</p>
              <button className="continue-btn" onClick={() => { setEditable(true); setShowEditAlert(false); }}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Delete Alert */}
        {showDeleteAlert && (
          <div className="alert-overlay" onClick={() => setShowDeleteAlert(false)}>
            <div className="alert" onClick={(e) => e.stopPropagation()}>
              <h3 className="alert-heading">Delete {formData.plateNo || "this vehicle"}?</h3>
              <p className="alert-text">Are you sure you want to delete this vehicle from the database?</p>
              <button className="confirmdel-btn" onClick={handleDelete}>Confirm Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
