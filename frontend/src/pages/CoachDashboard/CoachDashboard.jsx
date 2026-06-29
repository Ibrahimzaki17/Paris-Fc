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

  //update schedule
  const [training, setTraining] = useState(false);

  const openTraining = () => {
    setTraining(true);
  };

  const closeTraining = () => {
    setTraining(false);
  };

    //add match
  const [addMatch, setAddMatch] = useState(false);

  const openAddMatch = () => {
    setAddMatch(true);
  };

  const closeAddMatch = () => {
    setAddMatch(false);
  };

  //delete match
  const [deleteMatch, setDeleteMatch] = useState(false);

  const openDeleteMatch = () => {
    setDeleteMatch(true);
  };

  const closeDeleteMatch = () => {
    setDeleteMatch(false);
  };

  //edit match
  const [editMatch, setEditMatch] = useState(false);

  const [matchData, setMatchData] = useState({
    homeTeamImg: "",
    homeTeamName: "",
    awayTeamImg: "",
    awayTeamName: "",
    date: "",
    matchType: "",
  });

  const openEditMatch = () => {
    setEditMatch(true);
    setMatchData({
      homeTeamImg: "images/parisfc.png",
      homeTeamName: "Paris Fc",
      awayTeamImg: "images/parisfc.png",
      awayTeamName: "Eagles Fc",
      date: "2026-06-21",
      matchType: "League Match",
    });
  };

  const closeEditMatch = () => {
    setEditMatch(false);
  };

  const handleMatchChange = (e) => {
    setMatchData({
      ...matchData,
      [e.target.name]: e.target.value,
    });
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

      {training && (
        <div className="delete-overlay">
            <div className="add-coach">
                <h2>Update Schedule</h2>
                <form >
                    <label>Day</label>
                    <input type="text" />
                    <label>Time</label>
                    <input type="time" />
                    <label>Date</label>
                    <input type="date" />

                    <div className="action-btns">
                       <button>Update New Schedule</button>
                       <button onClick={closeTraining}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
      )}

        <div className="section-heading">
          <h2>Training Schedule</h2>
        </div>
        <div className="schedule-card">
          <p>Monday 4pm</p>
          <p>Monday 4pm</p>
          <p>Monday 4pm</p>
        </div>
        <div className="schedule-actions">
          <button onClick={openTraining}>Update Schedule</button>
        </div>
      </div>
      <div className="match-section">

             {addMatch && (
          <div className="delete-overlay">
            <div className="add-coach">
              <form>
                <label>Home Team Image</label>
                <input type="file" accept="images/*" />
                <div className="image-preview">
                  <img src="images/messi.jpeg" />
                </div>
                <label>Home Team Name</label>
                <input type="text" placeholder="Enter Home Team Name" />
                <label>Away Team Image</label>
                <input type="file" accept="images/*" />
                <div className="image-preview">
                  <img src="images/messi.jpeg" />
                </div>
                <label>Home Team Name</label>
                <input type="text" placeholder="Enter Away Team Name" />
                <label>Date</label>
                <input type="date" />
                <label>Match Type</label>
                <input type="text" placeholder="Enter Match Type" />

                <div className="action-btns">
                  <button>Add New Match</button>
                  <button onClick={closeAddMatch}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editMatch && (
          <div className="edit-overlay">
            <div className="edit-popup">
              <h2>Edit Coach</h2>
              <form>
                <label>Home Team Image</label>
                <input type="file" onChange={handleMatchChange}/>
                <div className="image-preview">
                  <img
                    src={matchData.homeTeamImg}
                  />
                </div>
                <label>Home Team Name</label>
                <input
                  type="text"
                  name="homeTeamName"
                  value={matchData.homeTeamName}
                  onChange={handleMatchChange}
                />
                <label>Away Team Image</label>
                <input type="file" onChange={handleMatchChange}/>
                <div className="image-preview">
                  <img
                    src={matchData.awayTeamImg}
                    
                  />
                </div>
                <label>Home Team Name</label>
                <input
                  type="text"
                  name="awayTeamName"
                  value={matchData.awayTeamName}
                  onChange={handleMatchChange}
                />
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={matchData.date}
                  onChange={handleMatchChange}
                />
                <label>Match Type</label>
                <input
                  type="text"
                  name="matchType"
                  value={matchData.matchType}
                  onChange={handleMatchChange}
                />
                <div className="action-btns">
                  <button>Save Changes</button>
                  <button onClick={closeEditMatch}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

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
          <button onClick={openAddMatch}>Add Match</button>
          <button onClick={openEditMatch}>Edit Match</button>
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
