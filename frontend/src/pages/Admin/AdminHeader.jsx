import { NavLink } from "react-router";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar4 from "./Sidebar4";

function AdminHeader() {
    const [showSideBar4, setShowSideBar4] = useState(false);

  const openSideBar4 = () => {
    setShowSideBar4(true);
  };
  const closeSideBar4 = () => {
    setShowSideBar4(false);
  };

  return (
    <header className="header">
      <div className="leftside-section">
        <NavLink className="NavLink" to="/">
          <img src="/images/parisfc.png" className="logo" />
          <h2>Paris Fc</h2>
        </NavLink>
      </div>
      <div className="middle-section">
        <nav>
         
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

      <div className="right-section">
        <NavLink className="NavLink" to="/login">
          Login
        </NavLink>

        <div className="burger-btn">
          <button onClick={openSideBar4}>
            <FaBars className="burger" />
          </button>
          {showSideBar4 && <Sidebar4 closeSideBar4={closeSideBar4} />}
        </div>
      </div>
     
    </header>
  );
}

export default AdminHeader
