import "./AdminDashboard.css";
import { FaBars } from "react-icons/fa";
import Sidebar4 from "./Sidebar4";
import { useState,useEffect } from "react";
import api from "../../api/axios";
import Dashboard from "./AdminPages/Dashboard";
import PlayerManagement from "./AdminPages/PlayerManagement";
import CoachManagement from "./AdminPages/CoachManagement";
import MatchManagement from "./AdminPages/MatchManagement";
import AnnouncementsManagement from "./AdminPages/AnnouncementsManagement";

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


 

  /************************CONNECTING TO THE BACKEND***************************** */
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
      try {
        setLoading(true); //AdminDashboard opens -> loading = true
        
        const response = await api.get('/dashboard'); //get dashboard api

        setDashboardData(response.data); // save response

      } catch (error) {
        setError("Failed to load dashboard data");
        console.error(error);
        
      } finally {
        setLoading(false)
      }
    };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if(loading) {
    return <div className="spinner">Loading...</div>
  }

  if(error) {
    return <div className="error-message">{error}</div>
  }


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
          <h2>Welcome Admin Name</h2>
        </span>
      </div>

      <Dashboard
          dashboardData={dashboardData} 
      />

      <PlayerManagement fetchDashboardData={fetchDashboardData} />

      <CoachManagement fetchDashboardData={fetchDashboardData} />

      <MatchManagement fetchDashboardData={fetchDashboardData} />

      <AnnouncementsManagement fetchDashboardData={fetchDashboardData} />

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

export  {AdminDashboard};