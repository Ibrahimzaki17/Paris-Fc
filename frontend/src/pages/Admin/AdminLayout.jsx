import "./AdminDashboard.css";
import { useState,useEffect } from "react";
import api from "../../api/axios";
import { Outlet } from "react-router";
import Dashboard from "./AdminPages/Dashboard";
import AdminHeader from "./AdminHeader";

function AdminLayout() {


  
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
        
        <span>
          <h2>ADMIN DASHBOARD</h2>
        </span>
      </div>
      <div>
        <AdminHeader />
      </div>
      
      <div className="welcome-message">
        <span>
          <h2>Welcome Admin </h2>
        </span>
      </div>

      <Dashboard
          dashboardData={dashboardData} 
      />
      
      <Outlet />
      
    </div>
  );
}

export  {AdminLayout};