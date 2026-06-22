import { NavLink } from "react-router";
import "./Header.css";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SideBar from "./SideBar";

function Header() {
  const [showSideBar, setShowSideBar] = useState(false);

  const openSideBar = () => {
    setShowSideBar(true);
  };
  const closeSideBar = () => {
    setShowSideBar(false)
  }

  return (
    <header className="header">
      <div className="leftside-section">
        <NavLink className="NavLink" to="/">
          <img src="images/parisfc.png" className="logo" />
          <h2>Paris Fc</h2>
        </NavLink>
      </div>
      <div className="middle-section">
        <nav>
          <NavLink
            className={({ isActive }) => {
              isActive ? "NavLink active" : "NavLink";
            }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink className="NavLink" to="/about">
            About
          </NavLink>
          <NavLink className="NavLink" to="/trophies">
            Trophies
          </NavLink>
          <NavLink className="NavLink" to="/contact">
            Contact
          </NavLink>
          <NavLink className="NavLink" to="/players">
            Players
          </NavLink>
          <NavLink className="NavLink" to="/coach">
            Coach
          </NavLink>
        </nav>
      </div>

      <div className="right-section">
        <NavLink className="NavLink" to="/login">
          Login
        </NavLink>

        <button className="burger-menu-btn" onClick={openSideBar}>
          <FaBars className="burger-icon" />
        </button>
      </div>
      {showSideBar && <SideBar closeSideBar={closeSideBar} />}
    </header>
  );
}

export default Header;
