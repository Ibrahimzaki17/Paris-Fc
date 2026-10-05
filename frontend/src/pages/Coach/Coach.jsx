import "./Coach.css";
import api from "../../api/axios";
import { useEffect, useState } from "react";

function Coach() {

  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCoach = async () => {
    try {

      const response = await api.get('/public/coaches');

      setCoaches(response.data.coaches);
      
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load player profile"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoach();
  },[])

  if (loading) {
    return <p>Loading Coaches...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!coaches) {
    return <p>Coaches not found.</p>;
  }

  return (
    <div className="coach-section">
      <div className="section-title">
        <h2>COACHING STAFF</h2>
      </div>
      <div className="head-coach-section">
        <span>
          <h2>Head Coach</h2>
        </span>
        {coaches
         .filter(coach => coach.position === "Head Coach")
         .map(coach => {
          return(
            <div key={coach.id} className="coach-card">
              <img src={coach.image} />
              <div className="details">
                <h2>{coach.fullname}</h2>
                <p>{coach.position}</p>
                <p>
                  Prefers possession-based football with high pressing and quick
                  passing transitions.
                </p>
              </div>
            </div>
          )
         })
        }
        
      </div>
      <div className="assistant-coach-section">
        <span>
          <h2>Assistant Coaches</h2>
        </span>

        <div className="assistant-coach-card">
          {coaches
           .filter(coach => coach.position === "Assistant Coach")
           .map(coach => {
            return(
              <div key={coach.id} className="assistant-coach-card">
                <img src={coach.image} />
                <div className="coach-details">
                  <h2>{coach.fullname}</h2>
                  <p>{coach.position}</p>
                </div>
              </div>
            )
           })
          }
        </div>
      </div>

      <div className="philosophy-section">
        <h2>Coaching Philosophy</h2>
        <p>Discipline, teamwork and excellence</p>
      </div>
    </div>
  );
}

export default Coach;
