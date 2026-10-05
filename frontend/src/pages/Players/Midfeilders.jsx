import { useEffect, useState } from "react"
import api from "../../api/axios";

function Midfielders() {

    const [midfielders, setMidfielders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMidfielders = async () => {
        try {
            const response = await api.get('/public/players');
            setMidfielders(response.data.players);

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to load midfield profile"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMidfielders();
    }, []);

    if (loading) {
    return <p>Loading midfields...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return(
      <div className="midfield-section" id="midfield-section">
          <div className="mf-title">
            <h2>Midfielders</h2>
          </div>

          <div className="midfields-container">
            {midfielders
              .filter(midfield =>
                midfield.position === "Defensive Midfield" ||
                midfield.position === "Center Midfield" ||
                midfield.position === "Attacking Midfield"
              )
              .map(midfield => {
                return (
                  <div key={midfield.id} className="midfield-card">
                    <div className="midfield-img">
                      <img src={midfield.image} />
                    </div>
                    <div className="midfield-details">
                      <h2>{midfield.fullname}</h2>
                      <p>{midfield.position}</p>
                      <div className="midfield-number">
                        <span>{midfield.jerseyNumber}</span>
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

export default Midfielders