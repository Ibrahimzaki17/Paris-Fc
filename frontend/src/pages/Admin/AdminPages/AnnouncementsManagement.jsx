import api from "../../../api/axios";
import { useState, useEffect } from "react";

function AnnouncementsManagement() {

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await api.get('/public/announcements');
            
            setAnnouncements(response.data.announcements)
        } catch (error) {
            setError("Failed to load")
            console.error(error);
            
        } finally {
            setLoading(false)
        }

        
    }
    fetchAnnouncements();
  }, []);

    if(loading) {
    return <div className="spinner">Loading...</div>
  }

  if(error) {
    return <div className="error-message">{error}</div>
  }

    return(
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

          {announcements.map(announcement => {

            return(
              <div key={announcement.id} className="news-cards">
                <div className="news-image">
                  <img src={announcement.image} />
                </div>
                <div className="news-content">
                  <div className="news-content-title">
                    <p>{announcement.title}</p>
                  </div>
                  <div className="news-content-description">
                    <p>{announcement.message}</p>
                  </div>
                  <div className="news-content-date">
                    <p>{announcement.createdAt}</p>
                  </div>
                  <div className="match-type">
                    <h2>{announcement.author}</h2>
                  </div>
                </div>
              </div>
            );
          })}

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
    );
}

export default AnnouncementsManagement