import api from "../../../api/axios";
import { useState, useEffect } from "react";
import formatMatchDate from "../../../formatDate";

function MatchManagement() {
  //add match
  const [addMatch, setAddMatch] = useState(false);

  //edit match
  const [editMatch, setEditMatch] = useState(false);

  //delete match
  const [deleteMatch, setDeleteMatch] = useState(false);




  //delete match

  const openDeleteMatch = () => {
    setDeleteMatch(true);
  };

  const closeDeleteMatch = () => {
    setDeleteMatch(false);
  };

  //edit match

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

  /**********************CONNECTING TO THE BACKEND************************* */
  //displaying matches states
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchMatches();
  }, []);

    if(loading) {
    return <div className="spinner">Loading...</div>
  }

  if(error) {
    return <div className="error-message">{error}</div>
  }

  const handleMatchChange = (e) => {
    setMatchForm({
      ...matchForm,
      [e.target.name]: e.target.value,
    });
  };
  
  //add match 
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
    if(homeImage) {
        formData.append("homeImage", homeImage);
    }
    if(awayImage) {
        formData.append("awayImage", awayImage);
    }

    console.log("HOME IMAGE:", homeImage);
    console.log("AWAY IMAGE:", awayImage);
    console.log("FORM DATA:", [...formData.entries()]);
    

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
          awayImage: "",
          matchDate: "",
          competition: "",
          venue: ""
        });
        setHomeImage(null);
        setAwayImage(null);
        setFormError("");

        fetchMatches();
        //comeback for fecthdashboard data
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

                      if(file) {
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

                      if(file) {
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

              <div className="action-btns">
                <button type="submit">Add New Match</button>
                <button type="button" onClick={closeAddMatch}>Cancel</button>
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
                <img src={`${match.homeImage}`} alt="homeimage"/>
                <h2>{match.homeTeam}</h2>
                <p>VS</p>
                <h2>{match.awayTeam}</h2>
                <img src={`${match.awayImage}`}/>
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
              <div className="action-btns">
          <button onClick={openEditMatch}>Edit Match</button>
          <button onClick={openDeleteMatch}>Delete Match</button>
        </div>
            </div>
            
          );
        })}

       

        {/* <div className="matches-card">
          <div className="teams">
            <img src="/images/parisfc.png" />
            <h2>Paris Fc</h2>
            <p>VS</p>
            <h2>Eagles Fc</h2>
            <img src="/images/paris.jpg" />
          </div>
          <div className="match-date">
            <h2>25 July 2026</h2>
          </div>
          <div className="match-type">
            <h2>League Match</h2>
          </div>
        </div> */}

        <div className="action-btns">
          <button onClick={openEditMatch}>Edit Match</button>
          <button onClick={openDeleteMatch}>Delete Match</button>
        </div>
      </div>
    </div>
  );
}

export default MatchManagement;
