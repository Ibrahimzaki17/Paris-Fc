import { useState, useEffect } from "react";
import api from "../../../api/axios";

function AdminProfile() {

    const [passwordForm, setPasswordForm] = useState(false);

    const openPasswordForm = () => {
        setPasswordForm(true);
    }

    const closePasswordForm = () => {
        setPasswordForm(false);
    }

    return (
        <>
            {passwordForm && (
               <div className="add-player-popup-overlay">
                <div className="add-player">
                    <h2>Change Password</h2>
                    <form>
                        <label>Current Password</label>
                        <input
                            type="text"

                        />
                        <label>New Password</label>
                        <input
                            type="text"

                        />
                        <label>Confirm Password</label>
                        <input
                            type="text"

                        />
                        <div className="action-btns">
                            <button>Change Password</button>
                            <button onClick={closePasswordForm}>Cancel</button>
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