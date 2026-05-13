import React, { useState } from "react";
import "../../styles/Add_Driver.css";
import { IoPersonOutline } from "react-icons/io5";

export default function AddDriverDialog({ onClose }) {
  const [formData, setFormData] = useState({
    licenseNo: "",
    fullName: "",
    birthdate: "",
    sex: "",
    address: "",
    licenseType: "",
    licenseIssuance: "",
    licenseExpiration: "",
    licenseStatus: ""
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Field labels for alert
  const fieldLabels = {
    licenseNo: "License Number",
    fullName: "Name",
    birthdate: "Birth Date",
    sex: "Sex",
    licenseType: "License Type",
    licenseIssuance: "License Issuance",
    licenseExpiration: "License Expiration",
    licenseStatus: "Status"
  };

  // Handle Add button click: validate required fields before showing confirmation alert
  const handleAddClick = () => {
    const requiredFields = [
      "licenseNo",
      "fullName",
      "birthdate",
      "sex",
      "licenseType",
      "licenseIssuance",
      "licenseExpiration",
      "licenseStatus"
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
      const res = await fetch("http://localhost:5000/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Driver added successfully!");
        setShowAlert(false);
        onClose();
      } else {
        alert("Error adding driver.");
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
          <IoPersonOutline className="driver-icon" />
          <h2 className="driver-title">Driver Details</h2>
        </div>

        {/* Table Form */}
        <table className="driver-table">
          <tbody>
            {/* License Number */}
            <tr>
              <th>LICENSE NO</th>
              <td className="wide-cell" colSpan="3">
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  maxLength="13"
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* Name */}
            <tr>
              <th className="wide-cell">NAME</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* Birth date and Sex */}
            <tr>
              <th>BIRTH DATE</th>
              <td className="birth-cell">
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </td>
              <th>SEX</th>
              <td className="sex-cell">
                <select
                  className="sex-input"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="">Sex</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </td>
            </tr>

            {/* Address */}
            <tr>
              <th>ADDRESS</th>
              <td className="wide-cell" colSpan="3">
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* License Type */}
            <tr>
              <th>LICENSE TYPE</th>
              <td className="wide-cell" colSpan="3">
                <select
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  <option value="Student Permit">Student Permit</option>
                  <option value="Non-Professional">Non-Professional</option>
                  <option value="Professional">Professional</option>
                </select>
              </td>
            </tr>

            {/* License Issuance and Expiration */}
            <tr>
              <th>ISSUANCE</th>
              <td className="wide-cell" colSpan="3">
                <input
                  type="date"
                  name="licenseIssuance"
                  value={formData.licenseIssuance}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>EXPIRATION</th>
              <td className="wide-cell" colSpan="3">
                <input
                  type="date"
                  name="licenseExpiration"
                  value={formData.licenseExpiration}
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* Status */}
            <tr>
              <th>STATUS</th>
              <td className="wide-cell" colSpan="3">
                <select
                  name="licenseStatus"
                  value={formData.licenseStatus}
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Revoked">Revoked</option>
                </select>
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
              <h3 className="alert-heading">ADD {formData.fullName || "this driver"} TO DRIVERS?</h3>
              <p className ="alert-text">Please confirm that you want to add this driver to the database. Click outside to go back.</p>
              <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}