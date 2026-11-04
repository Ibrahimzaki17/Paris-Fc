import "./AdminDashboard.css";
import { Outlet } from "react-router";
import AdminHeader from "./AdminHeader";

function AdminLayout() {

  return (
    <div className="admin-dashboard">
      
      
      <div>
        <AdminHeader />
      </div>
      
      <div className="welcome-message">
        <span>
          <h2>Welcome Admin </h2>
        </span>
      </div>

      <Outlet  />
      
    </div>
  );
}

export  {AdminLayout};