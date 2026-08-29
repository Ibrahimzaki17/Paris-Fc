import api from "../../../api/axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";

function CoachManagement() {
  const {fetchDashboardData} = useOutletContext();

  //add coach
  const [addCoach, setAddCoach] = useState(false);

  //edit coach
  const [editCoach, setEditCoach] = useState(false);

  //delete coach
  const [deleteCoach, setDeleteCoach] = useState(false);


  /***********************CONNECTING TO THE BACKEND************************* */
  // displaying coaches
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //adding coaches
  const [coachForm, setCoachForm] = useState({
    fullname: '',
    position: '',
    email: '',
    age: '',
    phone: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);

  //deleting states
  const [coachToDelete, setCoachToDelete] = useState(null);

  //errors
  const [formError, setFormError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  //success message
  const [formSuccess, setFormSuccess] = useState("");

  
  //displaying coach api
  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const response = await api.get('/coaches');

      setCoaches(response.data.formattedCoaches)

      } catch (error) {
      setError("Failed to load")
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoaches();
  },[]);

  if(loading) {
    return <div className="spinner">Loading...</div>
  }

  if(error) {
    return <div className="error-message">{error}</div>
  }

  //adding coaches
  const handleChange1 = (e) => {
    setCoachForm({
      ...coachForm,
      [e.target.name]: e.target.value,
    });
  }; 

  const openAddCoach = () => {
    setAddCoach(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const formData = new FormData();
    formData.append('fullname', coachForm.fullname);
    formData.append('position', coachForm.position);
    formData.append('email', coachForm.email);
    formData.append('age', coachForm.age);
    formData.append('phone', coachForm.phone)

    formData.append('image', selectedImage);

    try {
      //post request
      const response = await api.post('/coaches', formData);
      //success message
      setFormError('');
      setFormSuccess(response.data.message || 'Coach created successfylly');

      setTimeout(() => {
        setAddCoach(false);
        setCoachForm({
          fullname: '',
          position: '',
          email: '',
          age: '',
          phone: ''
        })
        setSelectedImage(null);
        setFormSuccess('');
        setFormError('');

        fetchCoaches();
        fetchDashboardData();
      }, 1500);

    } catch (error) {
        const data = error.response?.data;

        if (data?.errors) {
          setFormSuccess('');
            setValidationErrors(data.errors);
            setFormError("");
        } else {
          setFormSuccess('');
            setValidationErrors([]);
            setFormError(data?.message || "Something went wrong.");
        }
    }
    
  }

  const closeAddCoach = () => {
    setAddCoach(false);
    setFormSuccess('');
    setFormError('');
    setCoachForm({
          fullname: '',
          position: '',
          email: '',
          age: '',
          phone: ''
    })
  };

  //edit coach
  const openEditCoach = (coach) => {
    setCoachForm({
          id: coach.id,
          fullname: coach.fullname,
          position: coach.position,
          phone: coach.phone,
        });
    setEditCoach(true);    
  };

  //edit coach function
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const formData = new FormData();
    formData.append('fullname', coachForm.fullname);
    formData.append('position', coachForm.position);
    formData.append('phone', coachForm.phone)

    console.log(coachForm.id);
    

    try {
      const response = await api.put(`/coaches/${coachForm.id}`, formData);
      setFormError('');
      setFormSuccess(response.data.message || "Coach updated successfully");

      setTimeout(() => {
        setEditCoach(false);
        setCoachForm({
              fullname: '',
              position: '',
              phone: ''
        });
        setFormSuccess('')

        fetchCoaches();
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

  const closeEditCoach = () => {
    setEditCoach(false);
    setFormSuccess('');
    setFormError('');
    setCoachForm({
          fullname: '',
          position: '',
          phone: ''
    })
  };

  //delete coach function
  const openDeleteCoach = (coach) => {
    setCoachToDelete({
          id: coach.id,
          fullname: coach.fullname,
          position: coach.position,
          email: coach.email,
          age: coach.age,
          phone: coach.phone,
    })
    setDeleteCoach(true);
  };

  //delete coach function
  const handleDeleteCoach = async () => {
    try {
      const response = await api.delete(`/coaches/${coachToDelete.id}`);
      setFormError('')
      setFormSuccess(response.data.message || 'Coach deleted succesfully');

      setTimeout(() => {
        setDeleteCoach(false);
        setCoachToDelete(null);

        setFormSuccess('');

        fetchCoaches();
        fetchDashboardData();
      }, 1500);
    } catch (error) {
      const data = error.response?.data;
      setFormError(data?.message || "Something went wrong.");
    }
  };

  const closeDeleteCoach = () => {
    setDeleteCoach(false);
    setFormError('');
    setFormSuccess('');
    setCoachToDelete(null);
  };


  return (
    <div className="coach-management">
      <span>
        <h2>COACH MANAGEMENT</h2>
      </span>

      {addCoach && (
        <div className="delete-overlay">
          <div className="add-coach">
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input 
                  type="text" 
                  placeholder="Enter coach name"
                  name="fullname"
                  value={coachForm.fullname}
                  onChange={handleChange1}
                  />

                {validationErrors.find(err => err.field === "fullname") && (
                    <p className="form-error">
                        {validationErrors.find(err => err.field === "fullname").message}
                    </p>
                )}

              <label>Role</label>
              <select 
                  type="text" 
                  placeholder="Enter role"
                  name="position"
                  value={coachForm.position}
                  onChange={handleChange1}
              >
                <option value="head-coach">Head Coach</option>
                <option value="assistant-coach">Assitant Coach</option>
              </select>
              {validationErrors.find(err => err.field === "position") && (
                    <p className="form-error">
                        {validationErrors.find(err => err.field === "position").message}
                    </p>
                )}

              <label>Age</label>
              <input 
                  type="text" 
                  placeholder="Enter age"
                  name="age"
                  value={coachForm.age}
                  onChange={handleChange1}
              />
              {validationErrors.find(err => err.field === "age") && (
                    <p className="form-error">
                        {validationErrors.find(err => err.field === "age").message}
                    </p>
                )}

              <label>Email</label>
              <input
                  type="text" 
                  placeholder="Enter email"
                  name="email"
                  value={coachForm.email}
                  onChange={handleChange1}
              />
              {validationErrors.find(err => err.field === "email") && (
                    <p className="form-error">
                        {validationErrors.find(err => err.field === "email").message}
                    </p>
                )}

              <label>Contact</label>
              <input
                  type="text" 
                  placeholder="Enter phone number"
                  name="phone"
                  value={coachForm.phone}
                  onChange={handleChange1}
                  />
                {validationErrors.find(err => err.field === "phone") && (
                    <p className="form-error">
                        {validationErrors.find(err => err.field === "phone").message}
                    </p>
                )}

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

              {formSuccess && (<p className="success">{formSuccess}</p>)}

              <div className="action-btns">
                <button type="submit">Add New Coach</button>
                <button type="button" onClick={closeAddCoach}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editCoach && (
        <div className="edit-overlay">
          <div className="edit-popup">
            <h2>Edit Coach</h2>

            <form onSubmit={handleEditSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="fullname"
                value={coachForm.fullname}
                onChange={handleChange1}
              />
              
              <label>Role</label>
              <select 
                  type="text" 
                  placeholder="Enter role"
                  name="position"
                  value={coachForm.position}
                  onChange={handleChange1}
              >
                <option value="head-coach">Head Coach</option>
                <option value="assistant-coach">Assitant Coach</option>
              </select>

              <label>Contact</label>
              <input
                type="text"
                name="phone"
                value={coachForm.phone}
                onChange={handleChange1}
              />

              <div className="action-btns">

                {formSuccess && <p className="success">{formSuccess}</p>}

                {formError && <p className="form-error">{formError}</p>}

                <button type="submit">Save Changes</button>

                <button type="button" onClick={closeEditCoach}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteCoach && (
        <div className="delete-overlay">
          <div className="confirmation-message">
            <h2>Are you sure you want to delete {`${coachForm.fullname}`}</h2>
          </div>
          <div className="action-btns">
            <button onClick={handleDeleteCoach}>Delete</button>
            <button onClick={closeDeleteCoach}>Cancel</button>
          </div>
          <div>
            {formSuccess && (<p className="success-delete-message">{formSuccess}</p>)}
          </div>
        </div>
      )}

      <div className="action-btns">
        <button onClick={openAddCoach}>Add Coach</button>
      </div>
      <div className="coach-list-table">
        <table border="1">
          <tbody>
            <tr>
              <th>Coach Name</th>
              <th>Role</th>
              <th>Email</th>
              <td>Contact</td>
              <th>Actions</th>
            </tr>

            {coaches.map(coach => {
              return(
                <tr key={coach.id}>
                  <td>{coach.fullname}</td>
                  <td>{coach.position}</td>
                  <td>{coach.email}</td>
                  <td>{coach.phone}</td>
                  <td>
                    <div className="action-btns">
                      <button onClick={() =>  openEditCoach(coach)}>Edit Coach</button>
                      <button onClick={() => openDeleteCoach(coach)}>Delete Coach</button>
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

export default CoachManagement;
