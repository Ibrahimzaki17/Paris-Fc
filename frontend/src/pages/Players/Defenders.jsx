import { useEffect, useState } from "react"
import api from "../../api/axios";

function Defenders() {

    const [Defenders, setDefenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDefenders = async () => {
        try {
            const response = await api.get('/public/players');
            setDefenders(response.data.players);

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to load Defenders"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDefenders();
    }, []);

    if (loading) {
    return <p>Loading Defenders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return(
      <div className="midfield-section" id="midfield-section">
          <div className="mf-title">
            <h2>Defenders</h2>
          </div>

          <div className="midfields-container">
            {Defenders
              .filter(defender =>
                defender.position === "Left Back" ||
                defender.position === "Right Back" ||
                defender.position === "Center Back"
              )
              .map(defender => {
                return (
                  <div key={defender.id} className="midfield-card">
                    <div className="midfield-img">
                      <img src={defender.image} />
                    </div>
                    <div className="midfield-details">
                      <h2>{defender.fullname}</h2>
                      <p>{defender.position}</p>
                      <div className="midfield-number">
                        <span>{defender.jerseyNumber}</span>
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

export default Defenders