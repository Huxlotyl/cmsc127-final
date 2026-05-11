import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Dashboard.css"; 
import Sidebar from "../components/Sidebar";

import ltoLogo from "../assets/lto_logo.svg";
import { GoAlert } from "react-icons/go";
import { VscWindow } from "react-icons/vsc";
import { TbFileDescription } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { IoCarOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

function Dashboard() {
    const navigate = useNavigate();
    const handleSignout = () => {
        navigate("/");
    };

    const action = [
        { name: "VIEW DRIVERS", icon:  <IoPersonOutline/>, link: "/drivers" },
        { name: "VIEW VEHICLES", icon: <IoCarOutline />},
        { name: "VIEW REGISTRATIONS", icon: <TbFileDescription />, link: "/registration" },
        { name: "VIEW VIOLATIONS", icon: <GoAlert />},   
    ];

    return (
        <div className="dashboard-layout">
            {/* Sidebar Section */}
            <Sidebar active="dashboard" />

        {/* Main Content Section */}      
        <main className="main-content">
            <header className="dashboard-header">
                <h1>DASHBOARD</h1>
            </header>

            <hr className="dashboard-divider" />
             
            <section 
                className="description" 
                onClick={() => window.open("https://portal.lto.gov.ph", "_blank")}
                style={{ cursor: "pointer" }}
                > 
                <div className="description-content">    
                    <h2>Land Transportation Office</h2>
                    <p>A front line government agency showcasing fast and efficient public service for a progressive land transport sector.</p>             
                </div>
            </section>
                     
            <section className="action-border">
                {action.map((action, index) => (
                    <div className="action-card" key={index} onClick={() => navigate(action.link)}>
                        <div className="card-icon">{action.icon}</div>
                        <span className="card-text">{action.name}</span>
                    </div>
                ))}
            </section>
        </main>
    </div>
    );
}

export default Dashboard;