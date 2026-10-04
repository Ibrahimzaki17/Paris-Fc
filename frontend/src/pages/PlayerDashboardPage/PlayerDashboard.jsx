import { FaBars } from "react-icons/fa";
import "./PlayerDashboard.css";
import { useEffect, useState } from "react";
import SideBar2 from "./SideBar2";
import api from "../../api/axios";
import formatMatchDate from "../../formatDate";

function PlayerDashboard() {
  const [showSideBar2, setShowSideBar2] = useState(false);

  const [player, setPlayer] = useState(null);
  const [matches, setMatch] = useState([]);
  const [anns, setAnn] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordForm, setPasswordForm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fetchPlayerProfile = async () => {
    try {
      const response = await api.get("/me");
      const matchResponse = await api.get('/public/matches?limit=5');
      const annResponse = await api.get('/public/announcements?limit=5');

      setPlayer(response.data.player);
      setMatch(matchResponse.data.matches);
      setAnn(annResponse.data.announcements);

    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load player profile"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayerProfile();
  }, [])

  const openSideBar2 = () => {
    setShowSideBar2(true);
  };
  const closeSideBar2 = () => {
    setShowSideBar2(false);
  };

  if (loading) {
    return <p>Loading player profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!player) {
    return <p>Player profile not found.</p>;
  }

  const openPasswordForm = () => {
    setPasswordForm(true);
  }

  const closePasswordForm = () => {
    setPasswordForm(false);
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.put("/auth/change-password", {
        currentPassword,
        newPassword,
        confirmPassword
      });

      setSuccess(response.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      setError(error.response?.message || "Failed to change passsword");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="playerDashboard-page">

      {passwordForm && (
        <div className="add-player-popup-overlay">
          <div className="add-player">
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>



              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}

              />
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

              />
              <div>
                {success && <p className="success">{success}</p>}

                {error && <p className="form-error">{error}</p>}
              </div>
              <div className="action-btns">
                <button type="submit" disabled={loading}>
                  {loading ? "Changing..." : "Change Password"}
                </button>
                <button type="button" onClick={closePasswordForm}>Cancel</button>
              </div>
            </form>
          </div>


        </div>
      )}

      <button className="player-menu-btn" onClick={openSideBar2}>
        <FaBars className="burger" />
      </button>

      <div className="dashboard" id="dashboard">

        <div className="welcome-message">
          <h2>Welcome, {player.fullname}</h2>
          <p>Welcome to your Paris FC player dashboard.</p>
        </div>

        <div className="admin-profile">

          <div className="admin-image">
            <img src={player.image} alt={player.fullname} />
          </div>

          <div className="admin-info">

            <div className="player-name">
              <h2>{player.fullname}</h2>
              <span>{player.position}</span>
            </div>

            <div className="profile-details">

              <div className="profile-detail">
                <span>Name</span>
                <p>{player.fullname}</p>
              </div>

              <div className="profile-detail">
                <span>Email</span>
                <p>{player.email}</p>
              </div>

              <div className="profile-detail">
                <span>Contact</span>
                <p>{player.phone || "Not provided"}</p>
              </div>

              <div className="profile-detail">
                <span>Jersey Number</span>
                <p>#{player.jerseyNumber}</p>
              </div>

              <div className="profile-detail">
                <span>Nationality</span>
                <p>{player.nationality}</p>
              </div>

              <div className="profile-detail">
                <span>Status</span>
                <p className={`player-status ${player.status?.toLowerCase()}`}>
                  {player.status}
                </p>
              </div>

            </div>

            <div className="action-btns">
              <button onClick={openPasswordForm}>
                Change Password
              </button>

              <button>
                Edit Profile
              </button>
            </div>

          </div>

        </div>

      </div>

      <div className="player-statistics">

        <div className="section-heading">
          <h2>Player Statistics</h2>
          <p>Your performance with Paris FC</p>
        </div>

        <div className="statistics-grid">

          <div className="stat-card">
            <div className="stat-number">12</div>
            <p>Matches</p>
          </div>

          <div className="stat-card">
            <div className="stat-number">5</div>
            <p>Goals</p>
          </div>

          <div className="stat-card">
            <div className="stat-number">3</div>
            <p>Assists</p>
          </div>

          <div className="stat-card">
            <div className="stat-number">2</div>
            <p>Yellow Cards</p>
          </div>

          <div className="stat-card">
            <div className="stat-number">0</div>
            <p>Red Cards</p>
          </div>

        </div>

      </div>

      <div className="training-section">

        <div className="section-heading">
          <h2>Training Schedule</h2>
          <p>Keep up with the team's training sessions</p>
        </div>

        <div className="training-grid">

          <div className="training-card">
            <div className="training-day">
              <h3>Monday</h3>
              <span>Training</span>
            </div>

            <div className="training-time">
              <strong>4:00 PM</strong>
              <p>Football Training</p>
            </div>
          </div>


          <div className="training-card">
            <div className="training-day">
              <h3>Wednesday</h3>
              <span>Training</span>
            </div>

            <div className="training-time">
              <strong>4:00 PM</strong>
              <p>Tactical Training</p>
            </div>
          </div>


          <div className="training-card">
            <div className="training-day">
              <h3>Sunday</h3>
              <span>Training</span>
            </div>

            <div className="training-time">
              <strong>6:00 AM</strong>
              <p>Team Training</p>
            </div>
          </div>

        </div>

      </div>

      <div className="dashboard-section">
        <div className="section-heading">
          <h2>Upcoming Matches</h2>
          <p>Stay updated with our upcoming fixtures</p>
        </div>

        <div className="matches-grid">
          {matches.map(match => {
            return (
              <div className="match-card-1" key={match.id}>

                <div className="match-competition">
                  <span>{match.competition}</span>
                </div>

                <div className="teams">

                  <div className="team">
                    <img src={match.homeImage} alt={match.homeTeam} />
                    <h3>{match.homeTeam}</h3>
                  </div>

                  <div className="vs">
                    <span>VS</span>
                  </div>

                  <div className="team">
                    <img src={match.awayImage} alt={match.awayTeam} />
                    <h3>{match.awayTeam}</h3>
                  </div>

                </div>

                <div className="match-date">
                  <span>Match Day</span>
                  <h3>{formatMatchDate(match.matchDate)}</h3>
                </div>

                <div className="match-venue">
                  <span>Venue</span>
                  <p>{match.venue}</p>
                </div>

              </div>
            );
          })}
        </div>
      </div>


      <div className="dashboard-section announcements-section">

        <div className="section-heading">
          <h2>Latest Announcements</h2>
          <p>Latest news and updates from Paris FC</p>
        </div>

        <div className="announcements-grid">
          {anns.map(ann => {
            return (
              <div className="ann-display" key={ann.id}>

                {ann.image && (
                  <div className="announcement-image">
                    <img src={ann.image} alt={ann.title} />
                  </div>
                )}

                <div className="announcement-content">
                  <h2>{ann.title}</h2>

                  <p>{ann.message}</p>

                  <div className="announcement-meta">
                    <span>By {ann.author}</span>
                    <span>{new Date(ann.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <div className="trophies-section">

        <div className="section-heading">
          <h2>My Trophies</h2>
          <p>Achievements won with Paris FC</p>
        </div>

        <div className="trophies-grid">

          <div className="trophy-card">

            <div className="trophy-icon">
              🏆
            </div>

            <div className="trophy-info">
              <h3>Garissa County Cup</h3>
              <p>Champions</p>
              <span>2026</span>
            </div>

          </div>


          <div className="trophy-card">

            <div className="trophy-icon">
              🏆
            </div>

            <div className="trophy-info">
              <h3>Paris FC Youth Tournament</h3>
              <p>Champions</p>
              <span>2025</span>
            </div>

          </div>

        </div>

      </div>



      {showSideBar2 && <SideBar2 closeSideBar2={closeSideBar2} />}
    </div>
  );
}

export default PlayerDashboard;
