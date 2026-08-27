import { useState } from "react";
import api from "../../../api/axios";

function AdminProfile() {

    const [passwordForm, setPasswordForm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const openPasswordForm = () => {
        setPasswordForm(true);
    }

    const closePasswordForm = () => {
        setPasswordForm(false);
    }

   /*********************Connecting to backend******************** */
   const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError("");
        setSuccess("");

        const response = await api.put("/auth/change-password",{
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
        <>
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
            

            <div className="admin-profile">
                <img src="../../images/messi.jpeg" alt="admin pic" />
                <h2>Ibrahim zaki</h2>
                <h2>admin@parisfc.com</h2>
                <h2>0722851097</h2>
                <p>Administrator</p>
                <div className="action-btns">
                    <button onClick={openPasswordForm}>Change Password</button>
                </div>
            </div>
        </>


    );
}

export default AdminProfile