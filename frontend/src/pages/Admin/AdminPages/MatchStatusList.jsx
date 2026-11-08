
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

  //delete match
  const [deleteMatch, setDeleteMatch] = useState(false);

  const [matchToDelete, setMatchToDelete] = useState(null);

  //success state
  const [formSuccess, setFormSuccess] = useState("");

  //error states
  const [formError, setFormError] = useState("");

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

  /***************DELETE MATCH*********** */
  const openDeleteMatch = (match) => {
    setMatchToDelete(match)

    setDeleteMatch(true);
  };

  //delete match function
  const handleDeleteMatch = async () => {
    try {
      const response = await api.delete(`/matches/${matchToDelete.id}`);

      setMatches((previousMatches) =>
        previousMatches.filter(
          (match) => match.id !== matchToDelete.id
        )
      )

      setFormError("");
      setFormSuccess(
        response.data.message || "Match deleted successfully"
      );

      setTimeout(async () => {
        setDeleteMatch(false);
        setMatchToDelete(null);

        setFormError("");
        setFormSuccess("");

        // Calculate how many matches remain
        const remainingMatches =
          totalMatches - 1;

        // Calculate the last available page
        const newTotalPages =
          Math.ceil(remainingMatches / 5);

        // If current page no longer exists,
        // move to the previous page
        const pageToFetch =
          currentPage > newTotalPages
            ? newTotalPages
            : currentPage;

        await fetchMatches(pageToFetch); 

        // fetchDashboardData();

      }, 1500);

    } catch (error) {
      const data = error.response?.data;
      setFormError(data?.message || "Something went wrong.");
    }
  };

  const closeDeleteMatch = () => {
    setDeleteMatch(false);
    setMatchToDelete(null);
    setValidationErrors([])
    setFormError("");
    setFormSuccess("");
  };

  return (
    <div className="match-management">

{deleteMatch && (
        <div className="delete-overlay">
          <div className="confirmation-message">
            <h2>Are you sure you want to delete This Match</h2>
            <p>
              {matchToDelete.homeTeam} VS {matchToDelete.awayTeam}
            </p>
          </div>
          <div>
            {formSuccess && (
              <p className="success-delete-message">{formSuccess}</p>
            )}
          </div>
          <div className="action-btns">
            <button onClick={handleDeleteMatch}>Delete</button>
            <button onClick={closeDeleteMatch}>Cancel</button>
          </div>
        </div>
      )}

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
                <div className="pagination">
                  <button onClick={() => openDeleteMatch(match)}>Delete</button>
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
