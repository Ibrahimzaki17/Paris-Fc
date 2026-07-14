import api from "../../../api/axios";
import { useState, useEffect } from "react";

function PlayerManagement() {
  //add players pop up overlay
  const [addPlayer, setAddPlayer] = useState(false);

  const openAddPlayer = () => {
    setAddPlayer(true);
  };

  const closeAddPlayer = () => {
    setAddPlayer(false);
  };

  //Delete player
  const [deletePlayer, setDeletePlayer] = useState(false);

  const openDeletePlayer = () => {
    setDeletePlayer(true);
  };

  const closeDeletePlayer = () => {
    setDeletePlayer(false);
  };

  /***********************CONNECTING TO BACKEND*************************** */
  //displaying the players
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //adding players
  const [playerForm, setPlayerForm] = useState({
    fullname: "",
    position: "",
    email: "",
    jerseyNumber: "",
    age: "",
    phone: "",
  })

  const [selectedImage, setSelectedImage] = useState(null);

  //edit
  const [editPlayer, setEditPlayer] = useState(false);

  //errors
  const [formError, setFormError] = useState(''); 
  
//   displaying player api
  const fetchPlayers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/players');
            
            setPlayers(response.data.formattedPlayers)
        } catch (error) {
            setError("Failed to load")
            console.error(error);
            
        } finally {
            setLoading(false)
        }

        
    }

  useEffect(() => {
    fetchPlayers();
  }, []);

    if(loading) {
    return <div className="spinner">Loading...</div>
  }

  if(error) {
    return <div className="error-message">{error}</div>
  }

  /************************************************ */
  //Adding players
  const handleChange1 = (e) => {
    setPlayerForm({
      ...playerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //prepare multipart data for file uploads
    const formData = new FormData();
    formData.append('fullname', playerForm.fullname);
    formData.append('position', playerForm.position);
    formData.append('email', playerForm.email);
    formData.append('jerseyNumber', playerForm.jerseyNumber);
    formData.append('age', playerForm.age);
    formData.append('phone', playerForm.phone);
    formData.append('image', selectedImage);

    try {
        //post request
        const response = await api.post('/players', formData);
        //success message
        alert(response.data.message || 'Player created successfully');

        setAddPlayer(false);
        setPlayerForm({
            fullname: "",
            position: "",
            email: "",
            jerseyNumber: "",
            age: "",
            phone: "",
        })
        setSelectedImage(null)

        fetchPlayers();
    } catch (error) {
        const data = error.response?.data;

        if (data?.errors) {
            // Validation middleware errors
            setFormError(data.errors[0].message);
        } else {
            // Other errors like "User already exists"
            setFormError(data?.message || "Something went wrong.");
        }
    };
    

  }

    //edit player
  const openEditPlayer = (player) => {
    setPlayerForm({
      id: player.id,
      fullname: player.fullname,
      position: player.position,
      email: player.email,
      jerseyNumber: player.jerseyNumber,
      age: player.age,
      phone: player.phone,
    });
    setEditPlayer(true);
    
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    //prepare multipart data for file uploads
    const formData = new FormData();
    formData.append('fullname', playerForm.fullname);
    formData.append('position', playerForm.position);
    formData.append('email', playerForm.email);
    formData.append('jerseyNumber', playerForm.jerseyNumber);
    formData.append('age', playerForm.age);
    formData.append('phone', playerForm.phone);
    
    try {
      const response = await api.put(`/players/${playerForm.id}`, formData);
      alert(response.data.message || "Player updated successfully");

      setEditPlayer(false);
      setPlayerForm({
            fullname: "",
            position: "",
            email: "",
            jerseyNumber: "",
            age: "",
            phone: "",
      })

      fetchPlayers();
    } catch (error) {
      if (data?.errors) {
            // Validation middleware errors
            setFormError(data.errors[0].message);
        } else {
            // Other errors like "User already exists"
            setFormError(data?.message || "Something went wrong.");
        }
    }

  }

  const closeEditPlayer = () => {
    setEditPlayer(false);
  };



  return (
    <div className="player-management">
      <span>
        <h2>PLAYER MANAGEMENT</h2>
      </span>

      {addPlayer && (
        <div className="add-player-popup-overlay">
          <div className="add-player">
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input 
                  type="text" 
                  placeholder="Enter Player name" 
                  name="fullname"
                  value={playerForm.fullname}
                  onChange={handleChange1}
                  />
              <label>Email</label>
              <input 
                  type="email" 
                  placeholder="Enter Email "
                  name="email"
                  value={playerForm.email}
                  onChange={handleChange1}
                  />
              <label>Contact</label>
              <input 
                  type="text" 
                  placeholder="Enter phone number "
                  name="phone"
                  value={playerForm.phone}
                  onChange={handleChange1}
                  />    
              <label>Position</label>
              <select
                  type="text" 
                  placeholder="Enter Player Position " 
                  name="position"
                  value={playerForm.position}
                  onChange={handleChange1}
                  >
                    <option value="GK">GoalKeeper</option>
                    <option value="CB">Center Back</option>
                    <option value="RB">Right Back</option>
                    <option value="LB">Left Back</option>
                    <option value="DM">Defensive Midfield</option>
                    <option value="CM">Center Midfield</option>
                    <option value="AM">Attacking Midfield</option>
                    <option value="RW">Right Wing</option>
                    <option value="LW">Left Wing</option>
                    <option value="ST">Striker</option>
                  </select>
              <label>Jersey Number</label>
              <input 
                  type="number" 
                  placeholder="Enter jersey number"
                  name="jerseyNumber"
                  value={playerForm.jerseyNumber}
                  onChange={handleChange1}
                  />
              <label>Age</label>
              <input 
                  type="number" 
                  placeholder="Enter Player's Age"
                  name="age"
                  value={playerForm.age}
                  onChange={handleChange1}
                  />
              
              <label>Image</label>
              <div className="image-preview">
                <img src={selectedImage} />
              </div>

              <input 
                  type="file" 
                  accept="images/*"
                  name="image"
                  onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                  }}
                  />

                  {formError && (
                <p className="form-error">
                  {formError}
                </p>
              )}

              <div className="action-btns">
                <button type="submit">Add New Player</button>
                <button type="button" onClick={closeAddPlayer}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editPlayer && (
        <div className="edit-overlay">
          <div className="edit-popup">
            <h2>Edit Player</h2>

            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="fullname"
                value={playerForm.fullname}
                onChange={handleChange1}
              />

              <label>Position</label>
              <input
                type="text"
                name="position"
                value={playerForm.position}
                onChange={handleChange1}
              />

              <label>Jersey Number</label>
              <input
                type="text"
                name="jerseyNumber"
                value={playerForm.jerseyNumber}
                onChange={handleChange1}
              />

              <label>Age</label>
              <input
                type="text"
                name="age"
                value={playerForm.age}
                onChange={handleChange1}
              />

              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={playerForm.phone}
                onChange={handleChange1}
              />

              <div className="action-btns">
                {formError && (
                <p className="form-error">
                  {formError}
                </p>
              )}
                <button type="submit">Save Changes</button>

                <button type="button" onClick={closeEditPlayer}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletePlayer && (
        <div className="delete-overlay">
          <div className="confirmation-message">
            <h2>Are you sure you want to delete Ibrahim Zaki</h2>
          </div>
          <div className="action-btns">
            <button>Delete</button>
            <button onClick={closeDeletePlayer}>Cancel</button>
          </div>
        </div>
      )}

      <div className="action-btns">
        <button onClick={openAddPlayer}>Add Player</button>
      </div>
      <div className="player-list-table">
        <table border="1">
          <tbody>
            <tr>
              <th>Player Name</th>
              <th>Position</th>
              <th>Number</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
            {players.map(player => {
                return(
                    <tr key={player.id} >
                    <td>{player.fullname}</td>
                    <td>{player.position}</td>
                    <td>{player.jerseyNumber}</td>
                    <td>{player.email}</td>
                    <td>{player.phone}</td>
                    <td>
                        <div className="action-btns">
                        <button onClick={() =>  openEditPlayer(player)}>Edit Player</button>
                        <button onClick={openDeletePlayer}>Delete Player</button>
                        </div>
                    </td>
               </tr>
                );
               
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerManagement;
