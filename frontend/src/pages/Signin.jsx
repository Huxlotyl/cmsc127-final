import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Signin.css"; 

import ltoLogo from "../assets/lto_logo.svg";
import { FaRegIdCard } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";

function Signin() {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Debug Messages
  console.log("BUTTON CLICKED");
  console.log("FORM SUBMITTED");
  console.log("ABOUT TO FETCH");

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeID,
        password,
      }),
    });

    console.log("FETCH SENT");

    const data = await response.json();

    // If success, head to dashboard
    if (response.ok) {
      console.log("Login success:", data.message);
      navigate("/dashboard");
    }

    if (!response.ok) {
      console.error("Login failed:", data.message);
      return;
    }

    console.log("Login success:", data.message);

  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-titles">
          <h1 className="main-title">LAND TRANSPORTATION</h1>
          <p className="subtitle">Information Management System</p>
        </div>
        <div className="login-container">      
          <form className="login-form" onSubmit={handleSubmit}>
            <img src={ltoLogo} alt="LTO Logo" className="logo" />

            <div className="input-group">
              <FaRegIdCard className="input-icon" />
              <input
                type="text"
                id="employeeID"
                placeholder="EMPLOYEE ID"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
              />
            </div>
            <div className="input-group">
              <IoKeyOutline className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="sign-in-btn">Sign In</button>
          </form>
        </div>
      </div>
      <footer className="footer">
          <span>Copyright © 2024–2028 MLP Team</span>
          <span>CMSC 127 Final Project</span>
      </footer>
    </div>
  );
}

export default Signin;
