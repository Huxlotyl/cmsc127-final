import React, { useState, useEffect } from "react";
import "../../styles/Add_Driver.css";
import { IoPersonOutline } from "react-icons/io5";

export default function EditDriverDialog({ driver, onClose }) {
  // Normalize dates into YYYY-MM-DD for <input type="date" />
  const normalizeDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

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
    case "active":
      return "Active";
    case "expired":
      return "Expired";
    case "suspended":
      return "Suspended";
    case "revoked":
      return "Revoked";
    default:
      return "";
  }
};

  const formData = driver
  ? {
      ...driver,
      birthdate: normalizeDate(driver.birthdate),
      licenseIssuance: normalizeDate(driver.licenseIssuance),
      licenseExpiration: normalizeDate(driver.licenseExpiration),
      licenseStatus: normalizeStatus(driver.licenseStatus),
    }
  : {};

  const [editable, setEditable] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleChange = (e) => {
    if (editable) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Validation
  const fieldLabels = {
    licenseNo: "License Number",
    fullName: "Name",
    birthdate: "Birth Date",
    sex: "Sex",
    licenseType: "License Type",
    licenseIssuance: "License Issuance",
    licenseExpiration: "License Expiration",
    licenseStatus: "Status",
  };

  const validateFields = () => {
    const requiredFields = [
      "licenseNo",
      "fullName",
      "birthdate",
      "sex",
      "licenseType",
      "licenseIssuance",
      "licenseExpiration",
      "licenseStatus",
    ];
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
      const res = await fetch(`http://localhost:5000/drivers/${driver.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Driver details updated successfully!");
        onClose();
      } else {
        alert("Error updating driver.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the database.");
    }
  };

  // Delete driver
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/drivers/${driver.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Driver deleted successfully!");
        onClose();
      } else {
        alert("Error deleting driver.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to the database.");
    }
  };

  console.dir(driver);
  console.log("Status:", driver.licenseStatus);
  console.log("Form status:", formData.licenseStatus);
  console.log(Object.keys(driver));

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
            <tr>
              <th>LICENSE NO</th>
              <td className="wide-cell" colSpan="3">
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  maxLength="13"
                  onChange={handleChange}
                  disabled={!editable}
                />
              </td>
            </tr>

            <tr>
              <th className="wide-cell">NAME</th>
              <td colSpan="3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!editable}
                />
              </td>
            </tr>

            <tr>
              <th>BIRTH DATE</th>
              <td className="birth-cell">
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  disabled={!editable}
                />
              </td>
              <th>SEX</th>
              <td className="sex-cell">
                <select
                  className="sex-input"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  disabled={!editable}
                >
                  <option value="">Sex</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>ADDRESS</th>
              <td className="wide-cell" colSpan="3">
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!editable}
                />
              </td>
            </tr>

            <tr>
              <th>LICENSE TYPE</th>
              <td className="wide-cell" colSpan="3">
                <select
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleChange}
                  disabled={!editable}
                >
                  <option value="">Select type</option>
                  <option value="Student Permit">Student Permit</option>
                  <option value="Non-Professional">Non-Professional</option>
                  <option value="Professional">Professional</option>
                </select>
              </td>
            </tr>

            <tr>
              <th>ISSUANCE</th>
              <td className="wide-cell" colSpan="3">
                <input
                  type="date"
                  name="licenseIssuance"
                  value={formData.licenseIssuance}
                  onChange={handleChange}
                  disabled={!editable}
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
                  disabled={!editable}
                />
              </td>
            </tr>

            <tr>
              <th>STATUS</th>
              <td className="wide-cell" colSpan="3">
                <select
                  name="licenseStatus"
                  value={formData.licenseStatus || ""}
                  onChange={handleChange}
                  disabled={!editable}
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
              <h3 className="alert-heading">Edit {formData.fullName || "this driver"}'s Details</h3>
              <p className="alert-text">You are about to edit this driver's details. Press Continue to proceed.</p>
              <button className="confirm-btn" onClick={() => { setEditable(true); setShowEditAlert(false); }}>
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Delete Alert */}
        {showDeleteAlert && (
          <div className="alert-overlay" onClick={() => setShowDeleteAlert(false)}>
            <div className="alert" onClick={(e) => e.stopPropagation()}>
              <h3 className="alert-heading">Delete {formData.fullName || "this driver"}?</h3>
              <p className="alert-text">Are you sure you want to delete this driver from the database?</p>
              <button className="confirm-btn" onClick={handleDelete}>Confirm Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
