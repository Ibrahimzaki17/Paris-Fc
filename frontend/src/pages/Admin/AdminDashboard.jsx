import "./AdminDashboard.css";
import { FaBars } from "react-icons/fa";
import Sidebar4 from "./Sidebar4";
import { useState } from "react";

function AdminDashboard() {
  const [showSideBar4, setShowSideBar4] = useState(false);

  const openSideBar4 = () => {
    setShowSideBar4(true);
  };
  const closeSideBar4 = () => {
    setShowSideBar4(false);
  };

  //create accounts pop overlay
  const [createAccount, setCreateAccount] = useState(false);

  const openCreateAccount = () => {
    setCreateAccount(true);
  };

  const cancel = () => {
    setCreateAccount(false);
  };

  //add players pop up overlay
  const [addPlayer, setAddPlayer] = useState(false);

  const openAddPlayer = () => {
    setAddPlayer(true);
  };

  const closeAddPlayer = () => {
    setAddPlayer(false);
  };

  //edit player
  const [editPlayer, setEditPlayer] = useState(false);
  const [playerData, setPlayerData] = useState({
    name: "",
    position: "",
    email: "",
    jerseyNumber: "",
    age: "",
    phone: "",
  });

  const openEditPlayer = () => {
    setPlayerData({
      name: "Ibrahim zaki",
      position: "DMF",
      email: "ibrahim@gmail.com",
      jerseyNumber: "6",
      age: "22",
      phone: "0622851097",
    });
    setEditPlayer(true);
  };

  const closeEditPlayer = () => {
    setEditPlayer(false);
  };

  const handleChange = (e) => {
    setPlayerData({
      ...playerData,
      [e.target.name]: e.target.value,
    });
  };

  //Delete player
  const [deletePlayer, setDeletePlayer] = useState(false);

  const openDeletePlayer = () => {
    setDeletePlayer(true);
  };

  const closeDeletePlayer = () => {
    setDeletePlayer(false);
  };

  //add coach
  const [addCoach, setAddCoach] = useState(false);

  const openAddCoach = () => {
    setAddCoach(true);
  };

  const closeAddCoach = () => {
    setAddCoach(false);
  };

  //edit coach
  const [editCoach, setEditCoach] = useState(false);
  const [coachData, setCoachData] = useState({
    name: "",
    role: "",
    email: "",
  });

  const openEditCoach = () => {
    setEditCoach(true);
    setCoachData({
      name: "Ibrahim zaki",
      role: "Head Coach",
      email: "ibrahim@gmail.com",
    });
  };

  const closeEditCoach = () => {
    setEditCoach(false);
  };

  const handleCoachChange = (e) => {
    setCoachData({
      ...coachData,
      [e.target.name]: e.target.value,
    });
  };

  //delete coach
  const [deleteCoach, setDeleteCoach] = useState(false);

  const openDeleteCoach = () => {
    setDeleteCoach(true);
  };

  const closeDeleteCoach = () => {
    setDeleteCoach(false);
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
    <div className="admin-dashboard">
      <div className="admin-title">
        <div className="burger-btn">
          <button onClick={openSideBar4}>
            <FaBars className="burger" />
          </button>
          {showSideBar4 && <Sidebar4 closeSideBar4={closeSideBar4} />}
        </div>
        <span>
          <h2>ADMIN DASHBOARD</h2>
        </span>
      </div>
      <div className="welcome-message">
        <span>
          <h2>Welcome Admin Ibrahim</h2>
        </span>
      </div>
      <div className="admin-stats">
        <div>
          <h2>25</h2>
          <p>Players</p>
        </div>

        <div>
          <h2>3</h2>
          <p>Coaches</p>
        </div>

        <div>
          <h2>12</h2>
          <p>Matches</p>
        </div>

        <div>
          <h2>5</h2>
          <p>Announcements</p>
        </div>
      </div>
      <div className="player-management">
        <span>
          <h2>PLAYER MANAGEMENT</h2>
        </span>

        {addPlayer && (
          <div className="add-player-popup-overlay">
            <div className="add-player">
              <form>
                <label>Name</label>
                <input type="text" placeholder="Enter Player name" />
                <label>Email</label>
                <input type="email" placeholder="Enter Email " />
                <label>Position</label>
                <input type="text" placeholder="Enter Player Position " />
                <label>Jersey Number</label>
                <input type="number" placeholder="Enter jersey number" />
                <label>Age</label>
                <input type="number" placeholder="Enter Player's Age" />
                <label>Phone</label>
                <input type="text" placeholder="Enter Phone number" />
                <label>Image</label>
                <div className="image-preview">
                  <img src="images/messi.jpeg" />
                </div>

                <input type="file" accept="images/*" />

                <div className="action-btns">
                  <button>Add New Player</button>
                  <button type="button" onClick={closeAddPlayer}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editPlayer && (
          <div className="edit-overlay">
            <div className="edit-popup">
              <h2>Edit Player</h2>

              <form>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={playerData.name}
                  onChange={handleChange}
                />

                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={playerData.position}
                  onChange={handleChange}
                />

                <label>Jersey Number</label>
                <input
                  type="text"
                  name="jerseyNumber"
                  value={playerData.jerseyNumber}
                  onChange={handleChange}
                />

                <label>Age</label>
                <input
                  type="text"
                  name="age"
                  value={playerData.age}
                  onChange={handleChange}
                />

                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={playerData.phone}
                  onChange={handleChange}
                />

                <div className="action-btns">
                  <button type="submit">Save Changes</button>

                  <button type="button" onClick={closeEditPlayer}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deletePlayer && (
          <div className="delete-overlay">
            <div className="confirmation-message">
              <h2>Are you sure you want to delete Ibrahim Zaki</h2>
            </div>
            <div className="action-btns">
              <button>Delete</button>
              <button onClick={closeDeletePlayer}>Cancel</button>
            </div>
          </div>
        )}

        <div className="action-btns">
          <button onClick={openAddPlayer}>Add Player</button>
        </div>
        <div className="player-list-table">
          <table border="1">
            <tbody>
              <tr>
                <th>Player Name</th>
                <th>Position</th>
                <th>Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>Ibrahim Zaki</td>
                <td>Defensive Midfield</td>
                <td>6</td>
                <td>ibrahimzaki@gmail.com</td>
                <td>
                  <div className="action-btns">
                    <button onClick={openEditPlayer}>Edit Player</button>
                    <button onClick={openDeletePlayer}>Delete Player</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Ibrahim Zaki</td>
                <td>Defensive Midfield</td>
                <td>6</td>
                <td>ibrahimzaki@gmail.com</td>
                <td>
                  <div className="action-btns">
                    <button onClick={openEditPlayer}>Edit Player</button>
                    <button onClick={openDeletePlayer}>Delete Player</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="coach-management">
        <span>
          <h2>COACH MANAGEMENT</h2>
        </span>

        {addCoach && (
          <div className="delete-overlay">
            <div className="add-coach">
              <form>
                <label>Name</label>
                <input type="text" placeholder="Enter coach name" />
                <label>Role</label>
                <select>
                  <option>Head Coach</option>
                  <option>Assitant Coach</option>
                </select>
                <label>Email</label>
                <input type="email" placeholder="Enter email " />
                <label>Image</label>
                <div className="image-preview">
                  <img src="images/messi.jpeg" />
                </div>
                <input type="file" accept="images/*" />
                <div className="action-btns">
                  <button type="submit">Add New Coach</button>
                  <button type="button" onClick={closeAddCoach}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editCoach && (
          <div className="edit-overlay">
            <div className="edit-popup">
              <h2>Edit Coach</h2>

              <form>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={coachData.name}
                  onChange={handleCoachChange}
                />
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={coachData.role}
                  onChange={handleCoachChange}
                />
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={coachData.email}
                  onChange={handleCoachChange}
                />

                <div className="action-btns">
                  <button type="submit">Save Changes</button>

                  <button type="button" onClick={closeEditCoach}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteCoach && (
          <div className="delete-overlay">
            <div className="confirmation-message">
              <h2>Are you sure you want to delete Coach Ibrahim</h2>
            </div>
            <div className="action-btns">
              <button>Delete</button>
              <button onClick={closeDeleteCoach}>Cancel</button>
            </div>
          </div>
        )}

        <div className="action-btns">
          <button onClick={openAddCoach}>Add Coach</button>
        </div>
        <div className="coach-list-table">
          <table border="1">
            <tbody>
              <tr>
                <th>Coach Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>Ibrahim Zaki</td>
                <td>Head Coach</td>
                <td>ibrahimzaki@gmail.com</td>
                <td>
                  <div className="action-btns">
                    <button onClick={openEditCoach}>Edit Coach</button>
                    <button onClick={openDeleteCoach}>Delete Coach</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Immobile </td>
                <td>Assistant Coach</td>
                <td>ibrahimzaki@gmail.com</td>
                <td>
                  <div className="action-btns">
                    <button onClick={openEditCoach}>Edit Coach</button>
                    <button onClick={openDeleteCoach}>Delete Coach</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="match-managment">
        <span>
          <h2>MATCH MANAGEMENT</h2>
        </span>

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

        {deleteMatch && (
          <div className="delete-overlay">
            <div className="confirmation-message">
              <h2>Are you sure you want to delete This Match</h2>
            </div>
            <div className="action-btns">
              <button>Delete</button>
              <button onClick={closeDeleteMatch}>Cancel</button>
            </div>
          </div>
        )}
        <div className="action-btns">
          <button onClick={openAddMatch}>Add Match</button>
        </div>
        <div className="upcoming-matches">
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
          <div className="action-btns">
            <button onClick={openEditMatch}>Edit Match</button>
            <button onClick={openDeleteMatch}>Delete Match</button>
          </div>
        </div>
      </div>
      <div className="announcement-management">
        <span>
          <h2>ANNOUNCEMENT MANAGEMENT</h2>
        </span>
        <div className="form2-group">
          <form>
            <label> Title</label>
            <input type="text" placeholder="Title" required />
            <label> Message</label>
            <textarea placeholder="Announcement message" required></textarea>
            <button className="post-btn">POST ANNOUNCEMENT</button>
          </form>
        </div>
        <div className="recent-announcements">
          <div className="news-cards">
            <div className="news-image">
              <img src="images/stadium.avif" />
            </div>
            <div className="news-content">
              <div className="news-content-title">
                <p>Training Session Begins</p>
              </div>
              <div className="news-content-description">
                <p>The team prepares for the upcoming season.</p>
              </div>
              <div className="news-content-date">
                <p>25 June 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-accounts">
        <span>
          <h2>USER ACCOUNTS</h2>
        </span>

        {createAccount && (
          <div className="popup-overlay">
            <div className="create-account">
              <h2>Create New Account</h2>

              <form>
                <label>Full Name</label>
                <input type="text" />

                <label>Email</label>
                <input type="email" />

                <label>Password</label>
                <input type="password" />

                <label>Role</label>
                <select>
                  <option>Player</option>
                  <option>Coach</option>
                  <option>Admin</option>
                </select>

                <div className="popup-buttons">
                  <button type="submit">Create Account</button>

                  <button type="button" onClick={cancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="accounts">
          <table border="1">
            <tbody>
              <tr>
                <th>Player Accounts</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>Ibrahim zaki</td>
                <td>Ibrahim@gmail.com</td>
                <td>
                    <div className="action-btns">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="accounts">
          <table border="1">
            <tbody>
              <tr>
                <th>Coaches Accounts</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>Ibrahim zaki</td>
                <td>Ibrahim@gmail.com</td>
                <td>
                    <div className="action-btns">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="action-btns">
          <button onClick={openCreateAccount}>Create Account</button>
          <button>Reset Password</button>
          <button>Disable Account</button>
        </div>
      </div>
      <div className="website-content">
        <span>
          <h2>WEBSITE CONTENT</h2>
        </span>
        <div className="action-btns">
          <button>Edit Homepage news</button>
          <button>Edit About page</button>
          <button>Edit Trophies </button>
        </div>
      </div>
      <div className="admin-profile">
        <img src="images/messi.jpeg" alt="admin pic" />
        <h2>Ibrahim zaki</h2>
        <p>Administrator</p>
        <div className="action-btns">
          <button>Change Password</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
