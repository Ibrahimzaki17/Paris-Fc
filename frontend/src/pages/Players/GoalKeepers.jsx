import { useEffect, useState } from "react"
import api from "../../api/axios";

function GoalKeepers() {

    const [GoalKeepers, setGoalKeepers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchGoalKeepers = async () => {
        try {
            const response = await api.get('/public/players');
            setGoalKeepers(response.data.players);

        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to load GoalKeepers"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGoalKeepers();
    }, []);

    if (loading) {
    return <p>Loading GoalKeepers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return(
      <div className="midfield-section" id="midfield-section">
          <div className="mf-title">
            <h2>GoalKeepers</h2>
          </div>

          <div className="midfields-container">
            {GoalKeepers
              .filter(goalKeeper =>
                goalKeeper.position === "GoalKeeper" 
              )
              .map(goalKeeper => {
                return (
                  <div key={goalKeeper.id} className="midfield-card">
                    <div className="midfield-img">
                      <img src={goalKeeper.image} />
                    </div>
                    <div className="midfield-details">
                      <h2>{goalKeeper.fullname}</h2>
                      <p>{goalKeeper.position}</p>
                      <div className="midfield-number">
                        <span>{goalKeeper.jerseyNumber}</span>
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

export default GoalKeepers