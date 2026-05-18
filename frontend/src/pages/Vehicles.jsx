import React, { useState, useEffect } from "react";
import "../styles/Vehicles.css";
import Sidebar from "../components/Sidebar";
import AddVehicleDialog from "../components/add_entry/Add_Vehicle.jsx";
import EditVehicleDialog from "../components/edit_entry/Edit_Vehicle.jsx";

import { IoPersonOutline, IoCarOutline } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";
import { GoAlert } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { HiOutlinePlus } from "react-icons/hi";

import ltoLogo from "../assets/lto_logo.svg";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [searchOwner, setSearchOwner] = useState("");
  const [searchVehicle, setSearchVehicle] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchVehicles = (url = "http://localhost:5000/vehicles") => {
  fetch(url)
    .then(res => res.json())
    .then(data => setVehicles(data));
  };

  const handleSearchVehicle = (e) => {
    const value = e.target.value;
    setSearchVehicle(value);
    if (value.length > 0) {
      fetch(`http://localhost:5000/vehicles/search?search=${encodeURIComponent(value)}`)
        .then(res => res.json())
        .then(data => setVehicles(data))
        .catch(error => console.error("Search error:", error));
    } else {
      fetchVehicles();
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchOwner(value);
    
    if (value.length > 0) {
      fetch(`http://localhost:5000/vehicles/owners?owner=${encodeURIComponent(value)}`)
        .then(res => res.json())
        .then(data => setVehicles(data))
        .catch(error => console.error("Search error:", error));
    } else {
      fetchVehicles();
    }
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    if (value === "default"){
      fetchVehicles();
    } else {
      fetch(`http://localhost:5000/vehicles/sort?type=${(value)}`)
        .then(res => res.json())
        .then(data => setVehicles(data))
        .catch(error => console.error("Sort error:", error));
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="vehicles-layout">
      {/* SIDEBAR */}
      <Sidebar active="vehicles" />

      {/* MAIN CONTENT */}
      <main className="vehicles-page">
        <header className="vehicles-header">
          <h1>VEHICLE RECORDS</h1>
        </header>

        <hr className="vehicles-divider" />

        <div className="top-controls">
          <button className="add-btn" onClick={() => setShowDialog(true)}>
            <HiOutlinePlus />
          </button>

        <button className = "sort-btn" onClick={() => fetchVehicles()}>
          Show All
        </button>

          <select className="sort-dropdown" value = {sortBy} onChange={handleSort}>
            <option value = "default">Sort By: Default</option>
            <option value = "chassisNo">Chassis No.</option>
            <option value = "engineNo">Engine No.</option>
            <option value = "color">Color</option>
            <option value = "vehicleType">Vehicle Type</option>
            <option value = "make">Make</option>
            <option value = "model">Model</option>
            <option value = "year">Year</option>
          </select>

          <div className="search-box">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search owner" value = {searchOwner} onChange={handleSearch} />
          </div>
        
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search vehicle" value = {searchVehicle} onChange={handleSearchVehicle} />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>PLATE NO.</th>
                <th>CHASSIS NO.</th>
                <th>ENGINE NO.</th>
                <th>COLOR</th>
                <th>VEHICLE TYPE</th>
                <th>MAKE</th>
                <th>MODEL</th>
                <th>YEAR</th>
                <th>OWNER'S LICENSE NO.</th> 
              </tr>
            </thead>

            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.plateNo} onClick={() => setSelectedVehicle(vehicle)} >
                  <td>{vehicle.plateNo}</td>
                  <td>{vehicle.chassisNo}</td>
                  <td>{vehicle.engineNo}</td>
                  <td>{vehicle.color}</td>
                  <td>{vehicle.vehicleType}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.licenseNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Render dialog when state is true */}
        {showDialog && (
          <AddVehicleDialog onClose={() => setShowDialog(false)} />
        )}

        {/* Render edit dialog when a vehicle is selected */}
        {selectedVehicle && (
          <EditVehicleDialog
            key={selectedVehicle.plateNo}
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
            refreshVehicles={fetchVehicles}
          />
        )}
        
      </main>
    </div>
  );
}

export default Vehicles;
