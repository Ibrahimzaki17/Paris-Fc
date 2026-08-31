import api from "../../../api/axios";
import { useState, useEffect } from "react";
import formatMatchDate from "../../../formatDate";
import { useOutletContext } from "react-router";

function MatchManagement() {
  const {fetchDashboardData} = useOutletContext();

  //add match
  const [addMatch, setAddMatch] = useState(false);

  //edit match
  const [editMatch, setEditMatch] = useState(false);

  //delete match
  const [deleteMatch, setDeleteMatch] = useState(false);

  const [matchToDelete, setMatchToDelete] = useState(null);


  /**********************CONNECTING TO THE BACKEND************************* */
  //displaying matches states
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);

  //adding macthes states
  const [matchForm, setMatchForm] = useState({
    homeTeam: "",
    awayTeam: "",
    matchDate: "",
    competition: "",
    venue: ""
  })

  //images
  const [homeImage, setHomeImage] = useState(null);
  const [homeImagePreview, setHomeImagePreview] = useState(null);
  const [awayImage, setAwayImage] = useState(null);
  const [awayImagePreview, setAwayImagePreview] = useState(null);

  //success state
  const [formSuccess, setFormSuccess] = useState("");

  //error states
  const [formError, setFormError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  //Fetching match api
  const fetchMatches = async (page = currentPage) => {
    try {
      setLoading(true);
      const response = await api.get(`/matches?page=${page}&limit=5`);

      setMatches(response.data.matches);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages)
      setTotalMatches(response.data.totalMatches)

    } catch (error) {
      setError("Failed to load")
      console.error(error);

    } finally {
      setLoading(false)
    }


  }

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  const handleMatchChange = (e) => {
    setMatchForm({
      ...matchForm,
      [e.target.name]: e.target.value,
    });
  };

  /*******************ADD MATCH******************** */
  function openAddMatch() {
    setAddMatch(true);
  }

  //add match function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //prepare multipart data for file uploads
    const formData = new FormData();
    formData.append("homeTeam", matchForm.homeTeam);
    formData.append("awayTeam", matchForm.awayTeam);
    formData.append("matchDate", matchForm.matchDate);
    formData.append("competition", matchForm.competition);
    formData.append("venue", matchForm.venue);
    if (homeImage) {
      formData.append("homeImage", homeImage);
    }
    if (awayImage) {
      formData.append("awayImage", awayImage);
    }

    // console.log("HOME IMAGE:", homeImage);
    // console.log("AWAY IMAGE:", awayImage);
    // console.log("FORM DATA:", [...formData.entries()]);


    try {
      //post request
      const response = await api.post("/matches", formData);
      //success message
      setFormError("");
      setFormSuccess(response.data.message || "Match Created Successfully");

      setTimeout(() => {
        setAddMatch(false);
        setMatchForm({
          homeTeam: "",
          awayTeam: "",
          matchDate: "",
          competition: "",
          venue: ""
        });
        setHomeImage(null);
        setAwayImage(null);
        setFormError("");

        fetchMatches();
        fetchDashboardData();
      }, 1500);


    } catch (error) {
      const data = error.response?.data;

      if (data?.errors) {
        // Validation middleware errors
        setFormSuccess("");
        setValidationErrors(data.errors);
        setFormError("");
      } else {
        // Other errors like "User already exists"
        setFormSuccess("");
        setValidationErrors([]);
        setFormError(data?.message || "Something went wrong.");
      }
    }

  }

  const closeAddMatch = () => {
    setAddMatch(false);
    setFormError("");
    setValidationErrors([]);
    setFormSuccess("");
    setMatchForm({
      homeTeam: "",
      awayTeam: "",
      matchDate: "",
      competition: "",
      venue: ""
    })
    setHomeImage(null);
    setAwayImage(null);
    setHomeImagePreview(null);
    setAwayImagePreview(null);
  };

  /**************EDIT MATCH********** */
  const openEditMatch = (match) => {
    setMatchForm({
      id: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchDate: match.matchDate.split("T")[0],
      competition: match.competition,
      venue: match.venue,
    })
    //show existing images
    setHomeImage(null);
    setAwayImage(null);

    setHomeImagePreview(match.homeImage);
    setAwayImagePreview(match.awayImage);

    setEditMatch(true);
  };

  //edit match function
  const handleEditMatch = async (e) => {
    e.preventDefault();

    //prepare multipart data for file uploads
    const formData = new FormData();
    formData.append("homeTeam", matchForm.homeTeam);
    formData.append("awayTeam", matchForm.awayTeam);
    formData.append("matchDate", matchForm.matchDate);
    formData.append("competition", matchForm.competition);
    formData.append("venue", matchForm.venue);

    if (homeImage) {
      formData.append("homeImage", homeImage);
    }

    if (awayImage) {
      formData.append("awayImage", awayImage);
    }

    try {
      const response = await api.put(`/matches/${matchForm.id}`, formData);
      setFormError("");
      setFormSuccess(response.data.message || "Match updated succesfully");

      setTimeout(() => {
        setEditMatch(false);
        setMatchForm({
          homeTeam: "",
          awayTeam: "",
          matchDate: "",
          competition: "",
          venue: ""
        })
        setFormSuccess("");

        fetchMatches();
      }, 1500);


    } catch (error) {
      const data = error.response?.data;
      if (data?.errors) {
        // Validation middleware errors
        setFormError(data.errors[0].message);
      } else {
        // Other errors like "User already exists"
        setFormError(data?.message || "Something went wrong.");
      }

    }

  }

  const closeEditMatch = () => {
    setEditMatch(false);
    setFormError("");
    setFormSuccess("");
    setMatchForm({
      homeTeam: "",
      awayTeam: "",
      matchDate: "",
      competition: "",
      venue: ""
    })

    setHomeImage(null);
    setAwayImage(null);
    setHomeImagePreview(null);
    setAwayImagePreview(null)
  };

  /***************DELETE MATCH*********** */
  const openDeleteMatch = (match) => {
    setMatchToDelete({
      id: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchDate: match.matchDate.split("T")[0],
      competition: match.competition,
      venue: match.venue,
    })

    setDeleteMatch(true);
  };

  //delete match function
const handleDeleteMatch = async () => {
  try {
    const response = await api.delete(`/matches/${matchToDelete.id}`);

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

      fetchDashboardData();

    }, 1500);

  } catch (error) {
    const data = error.response?.data;
    setFormError(data?.message || "Something went wrong.");
  }
};

  const closeDeleteMatch = () => {
    setDeleteMatch(false);
    setMatchToDelete(null);
    setFormError("");
    setFormSuccess("");
  };

  return (
    <div className="match-managment">
      <span>
        <h2>MATCH MANAGEMENT</h2>
      </span>

      {addMatch && (
        <div className="delete-overlay">
          <div className="add-coach">
            <form onSubmit={handleSubmit}>
              {/* Home Team Name and Image */}
              <label>Home Team Name</label>
              <input
                type="text"
                placeholder="Enter Home Team Name"
                name="homeTeam"
                value={matchForm.homeTeam}
                onChange={handleMatchChange}
              />
              {validationErrors.find((err) => err.field === "homeTeam") && (
                <p className="form-error">
                  {
                    validationErrors.find((err) => err.field === "homeTeam")
                      .message
                  }
                </p>
              )}

              <label>Home Team Image</label>
              <input
                type="file"
                accept="images/*"
                name="homeImage"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setHomeImage(file);
                    setHomeImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
              <div className="image-preview">
                {homeImagePreview && (
                  <img src={homeImagePreview} alt="away image preview" />
                )}
              </div>


              {/* Away team name and image */}
              <label>Away Team Name</label>
              <input
                type="text"
                placeholder="Enter away Team Name"
                name="awayTeam"
                value={matchForm.awayTeam}
                onChange={handleMatchChange}
              />
              {validationErrors.find((err) => err.field === "awayTeam") && (
                <p className="form-error">
                  {
                    validationErrors.find((err) => err.field === "awayTeam")
                      .message
                  }
                </p>
              )}

              <label>Away Team Image</label>
              <input
                type="file"
                accept="images/*"
                name="awayImage"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setAwayImage(file);
                    setAwayImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
              <div className="image-preview">
                {awayImagePreview && (
                  <img src={awayImagePreview} alt="home image preview" />
                )}
              </div>


              {/* Date */}
              <label>Date</label>
              <input
                type="date"
                name="matchDate"
                value={matchForm.matchDate}
                onChange={handleMatchChange}
              />
              {validationErrors.find((err) => err.field === "matchDate") && (
                <p className="form-error">
                  {
                    validationErrors.find((err) => err.field === "matchDate")
                      .message
                  }
                </p>
              )}

              {/* Competition */}
              <label>Match Type</label>
              <select
                type="text"
                placeholder="Enter Match Type"
                name="competition"
                value={matchForm.competition}
                onChange={handleMatchChange}
              >
                <option value="League">League</option>
                <option value="Friendly">Friendly</option>
                <option value="Cup">Cup</option>
              </select>
              {validationErrors.find((err) => err.field === "competition") && (
                <p className="form-error">
                  {
                    validationErrors.find((err) => err.field === "competition")
                      .message
                  }
                </p>
              )}

              {/* Venue */}
              <label>Venue</label>
              <input
                type="text"
                placeholder="Enter venue "
                name="venue"
                value={matchForm.venue}
                onChange={handleMatchChange}
              />
              {validationErrors.find((err) => err.field === "venue") && (
                <p className="form-error">
                  {
                    validationErrors.find((err) => err.field === "venue")
                      .message
                  }
                </p>
              )}

              <div>
                {formSuccess && <p className="success">{formSuccess}</p>}

                {formError && <p className="form-error">{formError}</p>}
              </div>

              <div className="pagination">
                <button type="submit">Add New Match</button>
                <button type="button" onClick={closeAddMatch} >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editMatch && (
        <div className="edit-overlay">
          <div className="edit-popup">
            <h2>Edit Match</h2>
            <form onSubmit={handleEditMatch}>
              <label>Home Team Name</label>
              <input
                type="text"
                name="homeTeam"
                value={matchForm.homeTeam}
                onChange={handleMatchChange}
              />
              <label>Home Team Image</label>
              <input
                type="file"
                accept="images/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setHomeImage(file);
                    setHomeImagePreview(URL.createObjectURL(file));
                  }
                }}

              />
              <div className="image-preview">
                {homeImagePreview && (
                  <img src={homeImagePreview} alt="home image" />
                )}
              </div>
              <label>Away Team Name</label>
              <input
                type="text"
                name="awayTeam"
                value={matchForm.awayTeam}
                onChange={handleMatchChange}
              />
              <label>Away Team Image</label>
              <input
                type="file"
                accept="images/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file) {
                    setAwayImage(file);
                    setAwayImagePreview(URL.createObjectURL(file));
                  }
                }}

              />
              <div className="image-preview">
                {awayImagePreview && (
                  <img src={awayImagePreview} alt="away image" />
                )}
              </div>

              <label>Date</label>
              <input
                type="date"
                name="matchDate"
                value={matchForm.matchDate}
                onChange={handleMatchChange}
              />
              <label>Match Type</label>
              <select
                type="text"
                name="competition"
                value={matchForm.competition}
                onChange={handleMatchChange}
              >
                <option value="Friendly">Friendly</option>
                <option value="League">League</option>
                <option value="Cup">Cup</option>
              </select>
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                value={matchForm.venue}
                onChange={handleMatchChange}
              />
              <div>
                {formSuccess && <p className="success">{formSuccess}</p>}

                {formError && <p className="form-error">{formError}</p>}
              </div>
              <div className="action-btns">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeEditMatch}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      <div className="action-btns">
        <button onClick={openAddMatch}>Add Match</button>
      </div>
      <div className="upcoming-matches">

        {matches.map(match => {
          return (
            <div key={match.id} className="matches-card">
              <div className="teams">
                <img src={`${match.homeImage}`} alt="homeimage" />
                <h2>{match.homeTeam}</h2>
                <p>VS</p>
                <h2>{match.awayTeam}</h2>
                <img src={`${match.awayImage}`} />
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
                <button onClick={() => openEditMatch(match)}>Edit Match</button>
                <button onClick={() => openDeleteMatch(match)}>Delete Match</button>
              </div>
            </div>

          );
        })}

        <div className="pagination">
          <button onClick={() => fetchMatches(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => fetchMatches(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default MatchManagement;
