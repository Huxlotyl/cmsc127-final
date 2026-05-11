import React, { useState, useEffect } from "react";
import "../styles/Drivers.css";
import Sidebar from "../components/Sidebar";

import { VscWindow } from "react-icons/vsc";
import { IoPersonOutline, IoCarOutline } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";
import { GoAlert } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { HiOutlinePlus } from "react-icons/hi";

import ltoLogo from "../assets/lto_logo.svg";

function Drivers() {
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = (url = "http://localhost:5000/drivers") => {
  fetch(url)
    .then(res => res.json())
    .then(data => setDrivers(data));
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchSuspendedExpired = () => {
  fetchDrivers("http://localhost:5000/drivers/suspended-expired");
};

  return (
    <div className="drivers-layout">
      {/* SIDEBAR */}
      <Sidebar active="drivers" />

      {/* MAIN CONTENT */}
      <main className="drivers-page">
        <header className="drivers-header">
          <h1>DRIVER DETAILS</h1>
        </header>

        <hr className="drivers-divider" />

        <div className="top-controls">
          <button className="add-btn">
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
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.licenseNo}>
                  <td>{driver.licenseNo}</td>
                  <td>{driver.fullName}</td>
                  <td>{driver.birthdate}</td>
                  <td>{driver.sex}</td>
                  <td>{driver.address}</td>
                  <td>{driver.licenseType}</td>
                  <td>{driver.licenseStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Drivers;