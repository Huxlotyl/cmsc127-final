import React from "react";
import "../styles/Sidebar.css";

import { useNavigate } from "react-router-dom";

import { VscWindow } from "react-icons/vsc";
import { IoPersonOutline, IoCarOutline } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";
import { GoAlert } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";

import ltoLogo from "../assets/lto_logo.svg";

function Sidebar({ active }) {
    const navigate = useNavigate();

    const handleSignout = () => {
        navigate("/");
    };

    return (
        <aside className="sidebar">
            {/* HEADER */}
            <div>
                <div className="sidebar-header">
                    <img
                        src={ltoLogo}
                        alt="logo"
                        className="sidebar-logo"
                    />

                    <span className="sidebar-title">
                        MANAGEMENT SYSTEM
                    </span>
                </div>

                {/* NAVIGATION */}
                <nav className="sidebar-nav">
                    <div
                        className={`nav-item ${
                            active === "dashboard" ? "active" : ""
                        }`}
                        onClick={() => navigate("/dashboard")}
                    >
                        <VscWindow className="nav-icon" />
                        <span className="sidebar-text">HOME</span>
                    </div>

                    <div
                        className={`nav-item ${
                            active === "drivers" ? "active" : ""
                        }`}
                        onClick={() => navigate("/drivers")}
                    >
                        <IoPersonOutline className="nav-icon" />
                        <span className="sidebar-text">DRIVERS</span>
                    </div>

                    <div
                        className={`nav-item ${
                            active === "vehicles" ? "active" : ""
                        }`}
                    >
                        <IoCarOutline className="nav-icon" />
                        <span className="sidebar-text">VEHICLES</span>
                    </div>

                    <div
                        className={`nav-item ${
                            active === "registrations" ? "active" : ""
                        }`}
                        onClick={() => navigate("/registration")}
                    >
                        <TbFileDescription className="nav-icon" />
                        <span className="sidebar-text">
                            REGISTRATIONS
                        </span>
                    </div>

                    <div
                        className={`nav-item ${
                            active === "violations" ? "active" : ""
                        }`}
                    >
                        <GoAlert className="nav-icon" />
                        <span className="sidebar-text">
                            VIOLATIONS
                        </span>
                    </div>
                </nav>
            </div>

            {/* FOOTER */}
            <div
                className="sidebar-footer"
                onClick={handleSignout}
            >
                <IoLogOutOutline className="nav-icon" />

                <span className="sidebar-text">
                    SIGN OUT
                </span>
            </div>
        </aside>
    );
}

export default Sidebar;