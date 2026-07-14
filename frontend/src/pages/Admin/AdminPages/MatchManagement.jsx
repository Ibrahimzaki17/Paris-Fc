import api from "../../../api/axios";
import { useState, useEffect } from "react";

function MatchManagement() {
  //add match
  const [addMatch, setAddMatch] = useState(false);

  const openAddMatch = () => {
    setAddMatch(true);
  };

  const closeAddMatch = () => {
    setAddMatch(false);
  };

  //delete match
  const [deleteMatch, setDeleteMatch] = useState(false);

  const openDeleteMatch = () => {
    setDeleteMatch(true);
  };

  const closeDeleteMatch = () => {
    setDeleteMatch(false);
  };

  //edit match
  const [editMatch, setEditMatch] = useState(false);

  const [matchData, setMatchData] = useState({
    homeTeamImg: "",
    homeTeamName: "",
    awayTeamImg: "",
    awayTeamName: "",
    date: "",
    matchType: "",
  });

  const openEditMatch = () => {
    setEditMatch(true);
    setMatchData({
      homeTeamImg: "images/parisfc.png",
      homeTeamName: "Paris Fc",
      awayTeamImg: "images/parisfc.png",
      awayTeamName: "Eagles Fc",
      date: "2026-06-21",
      matchType: "League Match",
    });
  };

  const closeEditMatch = () => {
    setEditMatch(false);
  };

  const handleMatchChange = (e) => {
    setMatchData({
      ...matchData,
      [e.target.name]: e.target.value,
    });
  };

  /**********************CONNECTING TO THE BACKEND************************* */
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
        try {
            setLoading(true);
            const response = await api.get('/public/matches');
            
            setMatches(response.data.matches)
        } catch (error) {
            setError("Failed to load")
            console.error(error);
            
        } finally {
            setLoading(false)
        }

        
    }
    fetchMatches();
  }, []);

    if(loading) {
    return <div className="spinner">Loading...</div>
  }

  if(error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <div className="match-managment">
      <span>
        <h2>MATCH MANAGEMENT</h2>
      </span>

      {addMatch && (
        <div className="delete-overlay">
          <div className="add-coach">
            <form>
              <label>Home Team Image</label>
              <input type="file" accept="images/*" />
              <div className="image-preview">
                <img src="images/messi.jpeg" />
              </div>
              <label>Home Team Name</label>
              <input type="text" placeholder="Enter Home Team Name" />
              <label>Away Team Image</label>
              <input type="file" accept="images/*" />
              <div className="image-preview">
                <img src="images/messi.jpeg" />
              </div>
              <label>Home Team Name</label>
              <input type="text" placeholder="Enter Away Team Name" />
              <label>Date</label>
              <input type="date" />
              <label>Match Type</label>
              <input type="text" placeholder="Enter Match Type" />

              <div className="action-btns">
                <button>Add New Match</button>
                <button onClick={closeAddMatch}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editMatch && (
        <div className="edit-overlay">
          <div className="edit-popup">
            <h2>Edit Coach</h2>
            <form>
              <label>Home Team Image</label>
              <input type="file" onChange={handleMatchChange} />
              <div className="image-preview">
                <img src={matchData.homeTeamImg} />
              </div>
              <label>Home Team Name</label>
              <input
                type="text"
                name="homeTeamName"
                value={matchData.homeTeamName}
                onChange={handleMatchChange}
              />
              <label>Away Team Image</label>
              <input type="file" onChange={handleMatchChange} />
              <div className="image-preview">
                <img src={matchData.awayTeamImg} />
              </div>
              <label>Home Team Name</label>
              <input
                type="text"
                name="awayTeamName"
                value={matchData.awayTeamName}
                onChange={handleMatchChange}
              />
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={matchData.date}
                onChange={handleMatchChange}
              />
              <label>Match Type</label>
              <input
                type="text"
                name="matchType"
                value={matchData.matchType}
                onChange={handleMatchChange}
              />
              <div className="action-btns">
                <button>Save Changes</button>
                <button onClick={closeEditMatch}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteMatch && (
        <div className="delete-overlay">
          <div className="confirmation-message">
            <h2>Are you sure you want to delete This Match</h2>
          </div>
          <div className="action-btns">
            <button>Delete</button>
            <button onClick={closeDeleteMatch}>Cancel</button>
          </div>
        </div>
      )}

      <div className="action-btns">
        <button onClick={openAddMatch}>Add Match</button>
      </div>
      <div className="upcoming-matches">

        {matches.map(match => {
          return(
            <div key={match.id} className="matches-card">
              <div className="teams">
                <img src={match.homeImage} />
                <h2>{match.homeTeam}</h2>
                <p>VS</p>
                <h2>{match.awayTeam}</h2>
                <img src={match.awayImage} />
              </div>
              <div className="match-date">
                <h2>{match.matchDate}</h2>
              </div>
              <div className="match-type">
                <h2>{match.competition}</h2>
              </div>
              <div className="match-type">
                <h2>{match.venue}</h2>
              </div>
              <div className="action-btns">
          <button onClick={openEditMatch}>Edit Match</button>
          <button onClick={openDeleteMatch}>Delete Match</button>
        </div>
            </div>
            
          );
        })}

        <div className="matches-card">
          <div className="teams">
            <img src="images/parisfc.png" />
            <h2>Paris Fc</h2>
            <p>VS</p>
            <h2>Eagles Fc</h2>
            <img src="images/paris.jpg" />
          </div>
          <div className="match-date">
            <h2>25 July 2026</h2>
          </div>
          <div className="match-type">
            <h2>League Match</h2>
          </div>
        </div>

        <div className="action-btns">
          <button onClick={openEditMatch}>Edit Match</button>
          <button onClick={openDeleteMatch}>Delete Match</button>
        </div>
      </div>
    </div>
  );
}

export default MatchManagement;
