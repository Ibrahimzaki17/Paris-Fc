import "./PlayersPage.css";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";


function PlayersPage() {

  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlayers = async () => {
    try {
      const response = await api.get('/public/players');

      setPlayers(response.data.players);

    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load player profile"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, [])

  if (loading) {
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!players) {
    return <p>Players not found.</p>;
  }


  return (
    <div className="players-page">
      <title>Players</title>
      <div className="squad-title">
        <h2>PARIS FC SQUAD</h2>
      </div>



      <div className="link-section">
        <ul>
          <li><a href="#gk-section">GoalKeepers</a></li>
          <li><a href="#defenders-section">Defenders</a></li>
          <li><a href="#midfield-section">Midfielders</a></li>
          <li><a href="#forward-section">Forwards</a></li>
        </ul>
      </div>



      <div className="player-card-section">
        <div className="gk-section" id="gk-section">
          <div className="gk-title">
            <h2>Goalkeepers</h2>
          </div>

          <div className="players-container">

            {players
              .filter(player => player.position === "GoalKeeper")
              .slice(0, 3)
              .map(player => {
                return (
                  <div key={player.id} className="player-card">
                    <div className="player-img">
                      <img src={player.image} />
                    </div>
                    <div className="player-details">
                      <h2>{player.fullname}</h2>
                      <p>{player.position}</p>
                      <div className="player-number">
                        <span>{player.jerseyNumber}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              
          </div>
          <div className="view-all">
                <Link to="/players/goalkeepers">
                  View All GoalKeepers →
                </Link>
              </div>
        </div>

        <div className="defenders-section" id="defenders-section">
          <div className="df-title">
            <h2>Defenders</h2>
          </div>

          <div className="players-container">
            {players
              .filter(player =>
                player.position === "Right Back" ||
                player.position === "Left Back" ||
                player.position === "Center Back"
              )
              .slice(0, 4)
              .map(player => {
                return (
                  <div key={player.id} className="player-card">
                    <div className="player-img">
                      <img src={player.image} />
                    </div>
                    <div className="player-details">
                      <h2>{player.fullname}</h2>
                      <p>{player.position}</p>
                      <div className="player-number">
                        <span>{player.jerseyNumber}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="view-all">
                <Link to="/players/defenders">
                  View All Defenders →
                </Link>
              </div>
        </div>



        <div className="midfield-section" id="midfield-section">
          <div className="mf-title">
            <h2>Midfielders</h2>
          </div>

          <div className="players-container">
            {players
              .filter(player =>
                player.position === "Defensive Midfield" ||
                player.position === "Center Midfield" ||
                player.position === "Attacking Midfield"
              )
              .slice(0, 4)
              .map(player => {
                return (
                  <div key={player.id} className="player-card">
                    <div className="player-img">
                      <img src={player.image} />
                    </div>
                    <div className="player-details">
                      <h2>{player.fullname}</h2>
                      <p>{player.position}</p>
                      <div className="player-number">
                        <span>{player.jerseyNumber}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
          <div className="view-all">
                <Link to="/players/midfielders">
                  View All Midfielders →
                </Link>
              </div>
        </div>



        <div className="forward-section" id="forward-section">
          <div className="fw-title">
            <h2>Forwards</h2>
          </div>

          <div className="players-container">
            {players
              .filter(player =>
                player.position === "Right Wing" ||
                player.position === "Left Wing" ||
                player.position === "Striker"
              )
              .slice(0, 4)
              .map(player => {
                return (
                  <div key={player.id} className="player-card">
                    <div className="player-img">
                      <img src={player.image} />
                    </div>
                    <div className="player-details">
                      <h2>{player.fullname}</h2>
                      <p>{player.position}</p>
                      <div className="player-number">
                        <span>{player.jerseyNumber}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }



          </div>
          <div className="view-all">
                <Link to="/players/forwards">
                  View All Forwards →
                </Link>
              </div>
        </div>
      </div>
    </div>
  );
}

export default PlayersPage;
