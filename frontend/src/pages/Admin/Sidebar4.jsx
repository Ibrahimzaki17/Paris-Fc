import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";

function Sidebar4({closeSideBar4}) {
  return (
    <div className="sidebar-section">
      <button onClick={closeSideBar4}>
        <FaTimes className="X" />
      </button>
      <div className="navigation">
        <nav  className="nav"> 
          <NavLink className="NavLink" to="dashboard">
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              isActive ? "NavLink active" : "NavLink";
            }}
            to="players"
          >
            Players
          </NavLink>
          <NavLink className="NavLink" to="coaches">
            Coaches
          </NavLink>
          <NavLink className="NavLink" to="matches">
            Matches
          </NavLink>
          <NavLink className="NavLink" to="announcements">
            Announcements
          </NavLink>
           <NavLink className="NavLink" to="profile">
            Profile
          </NavLink>
        </nav>
      </div>
      </div>
    
  );
}

export default Sidebar4;
