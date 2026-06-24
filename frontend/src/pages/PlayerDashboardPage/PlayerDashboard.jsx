import { FaBars } from "react-icons/fa";
import "./PlayerDashboard.css";
import { useState } from "react";
import SideBar2 from "./SideBar2";

function PlayerDashboard() {
  const [showSideBar2, setShowSideBar2] = useState(false);

  const openSideBar2 = () => {
    setShowSideBar2(true);
  };
  const closeSideBar2 = () => {
    setShowSideBar2(false);
  };

  return (
    <div className="playerDashboard-page">
      <button onClick={openSideBar2}>
        <FaBars className="burger" />
      </button>

      <div className="dashboard" id="dashboard">
        <div className="player-header">
          <img src="images/messi.jpeg" />
          <div>
            <h2>Ibrahim Zaki</h2>
            <p>Defensive Midfielder</p>
          </div>
        </div>
        <span>
          <h2>Welcome Ibrahim</h2>
        </span>
        <div className="upcoming-training">
          <h2>Upcoming training</h2>
          <p>Monday 4:00 PM</p>
        </div>
        <div className="next-match">
          <h2>Next Match</h2>
          <p>Paris Fc vs Eagle Fc</p>
        </div>
        <div className="latest-announcements">
          <h2>Latest Announcements</h2>
          <p>Team meeting on Friday</p>
        </div>
      </div>

      <div className="announcements" id="announcements">
        <div className="announcement-card">
          <p>Training starts at 4 pm</p>
        </div>
        <div className="announcement-card">
          <p>Training starts at 4 pm</p>
        </div>
      </div>

      <div className="schedule" id="schedule">
        <span>
          <h2>Training Schedule</h2>
        </span>
        <div className="schedule-card">
          <p>Monday 4pm</p>
          <p>Monday 4pm</p>
          <p>Monday 4pm</p>
        </div>
      </div>

      <div className="matches" id="matches">
        <span>
          <h2>Upcoming Matches</h2>
        </span>
        <div className="match1-card">
          <h2>Paris Fc vs Eagle Fc</h2>
          <p>25 July 2026</p>
        </div>
        <div className="match1-card">
          <h2>Paris Fc vs Eagle Fc</h2>
          <p>25 July 2026</p>
        </div>
      </div>

      <div className="profile" id="profile">
        <div className="profile-card">
          <span>
            <h2>Player Profile</h2>
          </span>
          <p>
            <strong>Name:</strong> Ibrahim Zaki
          </p>
          <p>
            <strong>Position:</strong> DMF
          </p>
          <p>
            <strong>Jersey Number:</strong> 6
          </p>
          <p>
            <strong>Email:</strong> ibrahim@gmail.com
          </p>
        </div>
      </div>

      {showSideBar2 && <SideBar2 closeSideBar2={closeSideBar2} />}
    </div>
  );
}

export default PlayerDashboard;
