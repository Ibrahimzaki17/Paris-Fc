import { Navigate } from "react-router";

function ProtectedRoute({ children, role }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Not logged in
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role
    if (role && user.role !== role) {

        if (user.role === "admin") {
            return <Navigate to="/admin-dashboard" replace />;
        }

        if (user.role === "coach") {
            return <Navigate to="/coach-dashboard" replace />;
        }

        if (user.role === "player") {
            return <Navigate to="/player-dashboard" replace />;
        }
    }

    return children;
}

export default ProtectedRoute;