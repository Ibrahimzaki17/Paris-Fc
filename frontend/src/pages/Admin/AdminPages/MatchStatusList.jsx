
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import formatMatchDate from "../../../formatDate";

function MatchStatusList({ status, title }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);

  const fetchMatches = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(
        `/matches/${status}?page=${page}&limit=8`
      );

      setMatches(response.data.matches);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalMatches(response.data.totalMatches);

    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load matches."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches(1);
  }, [status]);

  if (loading) {
    return <div className="spinner">Loading matches...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="match-management">
      <h2>{title}</h2>

      <p>Total Matches: {totalMatches}</p>

      {matches.length === 0 ? (
        <p>No {status} matches available.</p>
      ) : (
        <div className="upcoming-matches">
          <div className="matches-grid">
            {matches.map((match) => (
              <div key={match.id} className="matches-card">

                <div className="teams">
                  {match.homeImage && (
                    <img src={match.homeImage} alt={match.homeTeam} />
                  )}

                  <h2>{match.homeTeam}</h2>

                  {status === "completed" ? (
                    <h2>
                      {match.homeScore} - {match.awayScore}
                    </h2>
                  ) : (
                    <p>VS</p>
                  )}

                  <h2>{match.awayTeam}</h2>

                  {match.awayImage && (
                    <img src={match.awayImage} alt={match.awayTeam} />
                  )}
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

                {status === "completed" && (
                  <div className="match-result">
                    <p>
                      Result: {
                        match.result === "home"
                          ? `${match.homeTeam} Won`
                          : match.result === "away"
                          ? `${match.awayTeam} Won`
                          : "Draw"
                      }
                    </p>
                  </div>
                )}

                {status === "postponed" && (
                  <div className="match-status">
                    <p>Postponed</p>
                  </div>
                )}

              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => fetchMatches(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => fetchMatches(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchStatusList;
