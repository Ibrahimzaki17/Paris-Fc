import { NavLink } from "react-router";
import "./CoachDashboard.css";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar3 from "./Sidebar3";

function CoachDashboard() {
  const [showSideBar3, setShowSideBar3] = useState(false);

  const openSideBar3 = () => {
    setShowSideBar3(true);
  };
  const closeSideBar3 = () => {
    setShowSideBar3(false);
  };

  return (
    <div className="coachDashboard-section">
      <button onClick={openSideBar3}>
        <FaBars className="burger" />
      </button>
      {showSideBar3 && <Sidebar3 closeSideBar3={closeSideBar3} />}
      <span>
        <h2>Welcome Coach Ibrahim</h2>
      </span>
      <div className="coach-stats">
        <div>
          <h2>25</h2>
          <p>Players</p>
        </div>

        <div>
          <h2>3</h2>
          <p>Coaches</p>
        </div>

        <div>
          <h2>2</h2>
          <p>Upcoming Matches</p>
        </div>

        <div>
          <h2>5</h2>
          <p>Announcements</p>
        </div>
      </div>
      <div className="players-section">
        <div className="stats1-box">
          <NavLink to="/players" className="navlink">
            <h1>25</h1>
            <h2>Players</h2>
          </NavLink>
        </div>
      </div>
      <div className="training-schedule">
        <div className="section-heading">
          <h2>Training Schedule</h2>
        </div>
        <div className="schedule-card">
          <p>Monday 4pm</p>
          <p>Monday 4pm</p>
          <p>Monday 4pm</p>
        </div>
        <div className="schedule-actions">
          <button>Update Schedule</button>
        </div>
      </div>
      <div className="match-section">
        <div className="matches-card">
          <div className="teams">
            <img src="images/parisfc.png" />
            <h2>Paris Fc</h2>
            <p>VS</p>
            <h2>Eagles Fc</h2>
            <img src="images/paris.jpg" />
          </div>
          <div className="match-date">
            <h2>25 July 2026</h2>
          </div>
          <div className="match-type">
            <h2>League Match</h2>
          </div>
        </div>
        <div className="match-actions">
          <button>Add Match</button>
          <button>Edit Match</button>
        </div>
      </div>
      <div className="announcement-section">
        <div className="form2-group">
          <form>
            <label>Announcement Title</label>
            <input type="text" placeholder="Title" required />
            <label>Announcement Message</label>
            <textarea placeholder="Announcement message" required></textarea>
            <button className="post-btn">POST</button>
          </form>
        </div>
      </div>
      <div className="reports-section">
        <div className="reports-titles">
          <ul>
            <li>
              <a href="#player-performance-report">Player Performance Report</a>
            </li>
            <li>
              <a href="#attendance-report">Attendance Report</a>
            </li>
            <li>
              <a href="#match-analysis">Match Analysis </a>
            </li>
          </ul>
        </div>
        <div
          className="player-performance-report"
          id="player-performance-report"
        >
          <h3>Strengths</h3>
          <ul>
            <li>Ball Recovery</li>
            <li>Passing</li>
          </ul>

          <h3>Needs Improvement</h3>
          <ul>
            <li>Finishing</li>
          </ul>
        </div>
        <div className="attendance-report" id="attendance-report">
          <h2>Attendance report</h2>
        </div>
        <div className="match-analysis" id="match-analysis">
          <h2>Match Analysis</h2>
        </div>
      </div>
      <div className="profile-section">
        <div className="headcoach-section">
          <span>
            <h2>Head Coach</h2>
          </span>
          <div className="head-coach-card">
            <img src="images/messi.jpeg" />
            <div className="details">
              <h2>Ibrahim Zaki</h2>
              <p>Manager</p>
              <p>
                Prefers possession-based football with high pressing and quick
                passing transitions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachDashboard;
