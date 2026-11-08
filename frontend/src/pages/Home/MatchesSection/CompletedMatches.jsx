import api from "../../../api/axios";
import formatMatchDate from "../../../formatDate";
import { useEffect, useState } from "react";

function CompletedMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompletedMatches = async () => {
    try {
      const response = await api.get(
        "/public/matches/completed?limit=8"
      );

      setMatches(response.data.matches);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load completed matches"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedMatches();
  }, []);

  if (loading) {
    return <p>Loading completed matches...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="matches-section">
      <div className="title">
        <h2>COMPLETED MATCHES</h2>
      </div>

      <div className="match-container">
        {matches.length === 0 ? (
          <p>No completed matches available.</p>
        ) : (
          matches.map((match) => (
            <div key={match.id} className="match-card">

              <div className="teams">
                <img src={match.homeImage} alt={match.homeTeam} />

                <h2>{match.homeTeam}</h2>

                <p>
                  {match.homeScore} - {match.awayScore}
                </p>

                <h2>{match.awayTeam}</h2>

                <img src={match.awayImage} alt={match.awayTeam} />
              </div>

              <div className="match-date">
                <h2>{formatMatchDate(match.matchDate)}</h2>
              </div>

              <div className="match-type">
                <h2>{match.competition}</h2>
              </div>

              <div className="match-type">
                <h2>{match.venue}</h2>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CompletedMatches;