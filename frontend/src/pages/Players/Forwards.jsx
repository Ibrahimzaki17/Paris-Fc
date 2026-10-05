import { useEffect, useState } from "react"
import api from "../../api/axios";

function Forwards() {

    const [forwards, setforwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchforwards = async () => {
        try {
            const response = await api.get('/public/players');
            setforwards(response.data.players);

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to load forwards"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchforwards();
    }, []);

    if (loading) {
    return <p>Loading forwards...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return(
      <div className="midfield-section" id="midfield-section">
          <div className="mf-title">
            <h2>forwards</h2>
          </div>

          <div className="midfields-container">
            {forwards
              .filter(forward =>
                forward.position === "Right Wing" ||
                forward.position === "Left Wing" ||
                forward.position === "Striker"
              )
              .map(forward => {
                return (
                  <div key={forward.id} className="midfield-card">
                    <div className="midfield-img">
                      <img src={forward.image} />
                    </div>
                    <div className="midfield-details">
                      <h2>{forward.fullname}</h2>
                      <p>{forward.position}</p>
                      <div className="midfield-number">
                        <span>{forward.jerseyNumber}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
        </div>
    )
}

export default Forwards