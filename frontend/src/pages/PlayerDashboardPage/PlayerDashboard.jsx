import { FaBars } from "react-icons/fa";
import "./PlayerDashboard.css";
import { useEffect, useState } from "react";
import SideBar2 from "./SideBar2";
import api from "../../api/axios";

function PlayerDashboard() {
  const [showSideBar2, setShowSideBar2] = useState(false);

  const [player, setPlayer] = useState(null);
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

      setPlayer(response.data.player);

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

      <button onClick={openSideBar2}>
        <FaBars className="burger" />
      </button>

      <div className="dashboard" id="dashboard">
        <div className="admin-profile">

        <div className="admin-image">
          <img src={player.image} alt={player.fullname} />
        </div>

        <div className="admin-info">
          <h2><b>Name:</b> {player.fullname}</h2>
          <h2><b>Email:</b>{player.email} </h2>
          <h2><b>Contact:</b> {player.phone}</h2>
          <p><b>Role:</b> {player.role}</p>

          <div className="action-btns">
            <button onClick={openPasswordForm}>Change Password</button>
            <button>Edit Profile</button>
          </div>
        </div>

      </div>
        <span>
          <h2>Welcome {player.fullname}</h2>
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

      

      {showSideBar2 && <SideBar2 closeSideBar2={closeSideBar2} />}
    </div>
  );
}

export default PlayerDashboard;
