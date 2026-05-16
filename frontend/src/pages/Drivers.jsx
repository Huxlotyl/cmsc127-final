import React, { useState, useEffect } from "react";
import "../styles/Drivers.css";
import Sidebar from "../components/Sidebar";
import AddDriverDialog from "../components/add_entry/Add_Driver.jsx";
import EditDriverDialog from "../components/edit_entry/Edit_Driver.jsx";

import { VscWindow } from "react-icons/vsc";
import { IoPersonOutline, IoCarOutline } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";
import { GoAlert } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { HiOutlinePlus } from "react-icons/hi";

import ltoLogo from "../assets/lto_logo.svg";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [licenseStatusFilter, setLicenseStatusFilter] = useState("");
  const [sexFilter, setSexFilter] = useState("");
  const [licenseTypeFilter, setLicenseTypeFilter] = useState("");
  const [ageRangeFilter, setAgeRangeFilter] = useState("");

  // Fetch data
  async function fetchDrivers() {
  try {
    const params = new URLSearchParams();

    if (licenseStatusFilter) {
      params.append("licenseStatus", licenseStatusFilter);
    }

    if (sexFilter) {
      params.append("sex", sexFilter);
    }

    if (licenseTypeFilter) {
  params.append("licenseType", licenseTypeFilter);
  }

    if (ageRangeFilter) {
  params.append("ageRange", ageRangeFilter);
  }

    const url = `http://localhost:5000/drivers?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();

    setDrivers(data);
  } catch (err) {
    console.error("Error fetching drivers:", err);
  }
}

  
  // Format date to Month Day, Year
  function formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  // Call fetchDrivers once when the page loads
  useEffect(() => {
  fetchDrivers();
  }, [
    licenseStatusFilter,
    sexFilter,
    licenseTypeFilter,
    ageRangeFilter
  ]);

  // Format date to Month Day, Year
  function formatDate(dateString) {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <div className="drivers-layout">
      <Sidebar active="drivers" />

      <main className="drivers-page">
        <header className="drivers-header">
          <h1>DRIVER DETAILS</h1>
        </header>

        <hr className="drivers-divider" />

        <div className="top-controls">
          {/* Button toggles state */}
          <button className="add-btn" onClick={() => setShowDialog(true)}>
            <HiOutlinePlus />
          </button>

        <select
          value={licenseStatusFilter}
          onChange={(e) => setLicenseStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Valid">Valid</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Suspended">Suspended</option>
          <option value="Revoked">Revoked</option>
        </select>

        <select
          value={sexFilter}
          onChange={(e) => setSexFilter(e.target.value)}
        >
          <option value="">All Sex</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <select
          value={licenseTypeFilter}
          onChange={(e) => setLicenseTypeFilter(e.target.value)}
        >
          <option value="">All License Types</option>
          <option value="Non-Professional">Non-Professional</option>
          <option value="Student Permit">Student Permit</option>
          <option value="Professional">Professional</option>
        </select>

        <select
          value={ageRangeFilter}
          onChange={(e) => setAgeRangeFilter(e.target.value)}
        >
          <option value="">All Ages</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-60">46-60</option>
          <option value="61+">61+</option>
        </select>

          <select className="sort-dropdown">
            <option>Sort By: Default</option>
          </select>

          <div className="search-box">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search drivers" />
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="drivers-table">
            <thead>
              <tr>
                <th>LICENSE NO.</th>
                <th>NAME</th>
                <th>BIRTH DATE</th>
                <th>SEX</th>
                <th>ADDRESS</th>
                <th>LICENSE TYPE</th>
                <th>ISSUANCE</th>
                <th>EXPIRATION</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr 
                  key={driver.licenseNo}
                  onClick={() => setSelectedDriver(driver)}
                  className="driver-row"
                >
                  <td>{driver.licenseNo}</td>
                  <td>{driver.fullName}</td>
                  <td>{formatDate(driver.birthdate)}</td>
                  <td>{driver.sex}</td>
                  <td>{driver.address}</td>
                  <td>{driver.licenseType}</td>
                  <td>{formatDate(driver.licenseIssuance)}</td>
                  <td>{formatDate(driver.licenseExpiration)}</td>
                  <td>{driver.licenseStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Render dialog when state is true */}
        {showDialog && (
          <AddDriverDialog 
          onClose={() => setShowDialog(false)} 
          refreshDrivers={fetchDrivers}
          />
        )}

        {/* Render edit dialog when a driver is selected */}
        {selectedDriver && (
          <EditDriverDialog
            key={selectedDriver.id}
            driver={selectedDriver}
            onClose={() => setSelectedDriver(null)}
            refreshDrivers={fetchDrivers}
          />
        )}
      </main>
    </div>
  );
}

export default Drivers;