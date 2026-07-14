import api from "../../../api/axios";
import { useState, useEffect } from "react";

function Dashboard({dashboardData}) {
  
  /*
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchDashboardData();
  }, []);

  if(loading) {
    return <div className="spinner">Loading...</div>
  }

  if(error) {
    return <div className="error-message">{error}</div>
  } */

  return (
    <div className="admin-stats">
      <div>
        <h2>{dashboardData.statistics.totalPlayers}</h2>
        <p>Players</p>
      </div>

      <div>
        <h2>{dashboardData?.statistics.totalCoaches}</h2>
        <p>Coaches</p>
      </div>

      <div>
        <h2>{dashboardData?.statistics.totalMatches}</h2>
        <p>Matches</p>
      </div>

      <div>
        <h2>{dashboardData?.statistics.totalAnnouncements}</h2>
        <p>Announcements</p>
      </div>
    </div>
  );
}

export default Dashboard
