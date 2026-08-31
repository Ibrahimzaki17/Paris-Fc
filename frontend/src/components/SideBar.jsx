import { NavLink } from "react-router";
import "./SideBar.css";
import { FaTimes } from "react-icons/fa";

function SideBar({ closeSideBar }) {

  const handleNavigation = () => {
    closeSideBar();
  }

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
            onClick={handleNavigation}
          >
            Home
          </NavLink>
          <NavLink className="NavLink" to="/about" onClick={handleNavigation}>
            About
          </NavLink>
          <NavLink className="NavLink" to="/trophies" onClick={handleNavigation}>
            Trophies
          </NavLink>
          <NavLink className="NavLink" to="/contact" onClick={handleNavigation}>
            Contact
          </NavLink>
          <NavLink to="/players" className="NavLink" onClick={handleNavigation}>
            Players
          </NavLink>
          <NavLink to="/coach" className="NavLink" onClick={handleNavigation}>
            Coach
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
export default SideBar;
