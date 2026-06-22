import { NavLink } from "react-router";
import "./SideBar.css";
import { FaTimes } from "react-icons/fa";

function SideBar({ closeSideBar }) {
  return (
    <div className="side-bar-component">
      <button className="close-btn" onClick={closeSideBar}>
        <FaTimes />
      </button>
      <div className="main-navigation-sidebar">
        <nav className="nav">
          <NavLink
            className="NavLink"
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
         
        </nav>
      </div>
      <hr />
      <div className="bottom-section">
        <nav className="Team-navigation">
          <NavLink to="/players">Players</NavLink>
          <NavLink to="/coach">Coach</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </div>
    </div>
  );
}
export default SideBar;
