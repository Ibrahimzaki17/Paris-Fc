import { FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router";

function Sidebar4({closeSideBar4}) {

  const handleNavigatin = () => {
    closeSideBar4();
  }

  return (
    <div className="sidebar-section">
      <button onClick={closeSideBar4}>
        <FaTimes className="X" />
      </button>
      <div className="navigation">
        <nav  className="nav"> 
          <NavLink to="/admin-dashboard" onClick={handleNavigatin}>
             Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => 
              isActive ? "NavLink active" : "NavLink"
            }
            to="players"
            onClick={handleNavigatin}
          >
            Players
          </NavLink>
          <NavLink className="NavLink" to="coaches" onClick={handleNavigatin}>
            Coaches
          </NavLink>
          <NavLink className="NavLink" to="matches" onClick={handleNavigatin}>
            Matches
          </NavLink>
          <NavLink className="NavLink" to="announcements" onClick={handleNavigatin}>
            Announcements
          </NavLink>
          <NavLink className="NavLink" to="messages" onClick={handleNavigatin}>
              Messages
           </NavLink>
           <NavLink className="NavLink" to="profile" onClick={handleNavigatin}>
            Profile
          </NavLink>
          <NavLink  to="/admin-dashboard/completed-matches" onClick={handleNavigatin}>
            Completed Matches
            </NavLink>

            <Link to="/admin-dashboard/postponed-matches" onClick={handleNavigatin}>
            Postponed Matches
            </Link>
        </nav>
      </div>
      </div>
    
  );
}

export default Sidebar4;
