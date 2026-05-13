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

  // Fetch data
  useEffect(() => {
    fetchDrivers();
  }, []);

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

        <button onClick={fetchSuspendedExpired}>
          Suspended / Expired
          </button>

        <button onClick={() => fetchDrivers()}>
          Show All
        </button>

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
          <AddDriverDialog onClose={() => setShowDialog(false)} />
        )}

        {/* Render edit dialog when a driver is selected */}
        {selectedDriver && (
          <EditDriverDialog
            key={selectedDriver.id}
            driver={selectedDriver}
            onClose={() => setSelectedDriver(null)}
          />
        )}
      </main>
    </div>
  );
}

export default Drivers;