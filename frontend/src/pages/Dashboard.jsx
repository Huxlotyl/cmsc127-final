import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Dashboard.css"; 

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
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src={ltoLogo} alt="logo" className="sidebar-logo" />
                    <span className="sidebar-title">MANAGEMENT SYSTEM</span>    
                </div>
            
                <nav className="sidebar-nav">
                    {/* <div className="nav-item" onClick={() => navigate("/drivers")}> */}
                    <div className="nav-item active" ><VscWindow className="nav-icon"/><span className = "sidebar-text">HOME</span></div>
                    <div className="nav-item"><IoPersonOutline className="nav-icon"/><span className = "sidebar-text">DRIVERS</span></div>
                    <div className="nav-item"><IoCarOutline className="nav-icon"/><span className = "sidebar-text">VEHICLES</span></div>
                    <div className="nav-item" onClick={() => navigate("/registration")}><TbFileDescription className="nav-icon"/><span className = "sidebar-text">REGISTRATIONS</span></div>
                    <div className="nav-item"><GoAlert className="nav-icon"/><span className = "sidebar-text">VIOLATIONS</span></div>
                </nav>

                <div className="sidebar-footer" onClick = {handleSignout}>
                    <IoLogOutOutline className="nav-icon"/>
                    <span className="sidebar-text">SIGN OUT</span>
                </div>  
            </aside>

        {/* Main Content Section */}      
        <main className="main-content">
             <header className="dashboard-header">
                 <h1>DASHBOARD</h1>
             </header>
             
            <section className="description"> 
                <div className="description-content">    
                    <h2>Land Transportation Office</h2>
                    <p>A front line government agency showcasing fast and efficient public service for a progressive land transport sector.</p>             
                </div>
            </section>          
        
            <section className="action-border">
                {action.map((action, index) => (
                    <div className="action-card" key={index} onClick={() => navigate(action.link)}>
                        <div className="card-icon">{action.icon}</div>
                        <hr className="card-divider" />
                        <span className="card-text">{action.name}</span>
                    </div>
                ))}
            </section>
        </main>
    </div>
    );
}

export default Dashboard;
