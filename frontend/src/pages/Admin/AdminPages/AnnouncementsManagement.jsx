import { useOutletContext } from "react-router";
import api from "../../../api/axios";
import { useState, useEffect } from "react";

function AnnouncementsManagement() {

  const { fetchDashboardData } = useOutletContext();

  //add announcements
  const [addAnn, setAddAnn] = useState(false);

  //delete annoucements
  const [deleteAnn, setDeleteAnn] = useState(false);

  const [annToDelete, setAnnToDelete] = useState(null);

  //displaying the announcements states
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //adding ann states
  const [annForm, setAnnForm] = useState({
    title: "",
    message: "",
  })

  //image states
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  //success state
  const [formSuccess, setFormSuccess] = useState("");

  //error states
  const [formError, setFormError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);



  const fetchAnnouncements = async (page = currentPage) => {
    try {
      setLoading(true);
      const response = await api.get(`/announcements?page=${page}&limit=5`);

      setAnnouncements(response.data.announcements);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages)

    } catch (error) {
      setError("Failed to load")
      console.error(error);

    } finally {
      setLoading(false)
    }


  }

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  const handleAnnChange = (e) => {
    setAnnForm({
      ...annForm,
      [e.target.name]: e.target.value,
    })
  }

  /*******************ADD ANNOUNCEMENTS************** */

  const openAddAnn = () => {
    setAddAnn(true);
  }

  //add ann function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //prepare multipart data for file uploads
    const formData = new FormData();
    formData.append("title", annForm.title);
    formData.append("message", annForm.message);

    if(image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post('/announcements', formData);

      setFormError("");
      setFormSuccess(response.data.message || "Announcement Posted Succesfully");

      setTimeout(() => {
        setAddAnn(false);
        setAnnForm({
          title: "",
          message: "",

        });
        setImage(null);
        setImagePreview(null);

        setFormError("");

        fetchAnnouncements();
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

  const closeAddAnn = () => {
    setAddAnn(false);
    setFormError("");
    setFormSuccess("");
    setValidationErrors([]);
    setAnnForm({
      title: "",
      message: "",
    })
    setImage(null);
    setImagePreview(null);

  }

  /***************DELETE ANNOUNCEMENTS************* */
  const openDeleteAnn = (ann) => {
    setAnnToDelete({
      id: ann.id,
      title: ann.id,
      message: ann.message
    })
    setDeleteAnn(true);
  }

  //handle delete announcements
  const handleDeleteAnn = async () => {
   try {
    const response = await api.delete(`/announcements/${annToDelete.id}`);
    setFormError("");
    setFormSuccess(response.data.message || "Announcement deleted Succesfully");

    setTimeout(() => {
      setDeleteAnn(false);
      setAnnToDelete(null);

      setFormError("");
      setFormSuccess("");

      fetchAnnouncements();
      fetchDashboardData();
    }, 1500);
   } catch (error) {
      const data = error.response?.data;
      setFormError(data?.message || "Something went wrong.");
   }
  }

  const closeDeleteAnn = () => {
    setDeleteAnn(false);
    setAnnToDelete(null);
    setFormError("");
    setFormSuccess("");
  }

  return (
    <div className="announcement-management">
      <span>
        <h2>ANNOUNCEMENT MANAGEMENT</h2>
      </span>
      <div className="action-btns">
        <button onClick={openAddAnn}>Add Announcement</button>
      </div>

      {addAnn && (
        <div className="edit-overlay">
          <div className="edit-popup">
            <form onSubmit={handleSubmit}>

              <label> Title</label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={annForm.title}
                onChange={handleAnnChange}
              />
              {validationErrors.find((err) => err.field === "title") && (
                <p className="form-error">
                  {
                    validationErrors.find((err) => err.field === "title")
                      .message
                  }
                </p>
              )}

              <label> Message</label>
              <textarea
                placeholder="Announcement message"
                name="message"
                value={annForm.message}
                onChange={handleAnnChange}
              ></textarea>
              {validationErrors.find((err) => err.field === "message") && (
                <p className="form-error">
                  {
                    validationErrors.find((err) => err.field === "message")
                      .message
                  }
                </p>
              )}

              <label>Announcement Image</label>
              <input 
                    type="file"
                    accept="images/*"
                    name="image"
                    onChange={(e) => {
                      const file = e.target.files[0];

                      if(file) {
                        setImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    />

              <div className="image-preview">
                {imagePreview && (
                  <img src={imagePreview} alt="announcements image" />
                )}
              </div>

              <div>
                {formSuccess && <p className="success">{formSuccess}</p>}

                {formError && <p className="form-error">{formError}</p>}
              </div>

              <div className="action-btns">
                <button type="submit">Post Announcement</button>
                <button type="button" onClick={closeAddAnn}>Cancel</button>
              </div>
            </form>
          </div>

        </div>

      )}

      {deleteAnn && (
        <div className="delete-overlay">
          <div className="confirmation-message">
            <h2>Are you sure you want to delete This Announcement</h2>
          </div>
          <div>
            {formSuccess && (
              <p className="success-delete-message">{formSuccess}</p>
            )}
          </div>
          <div className="action-btns">
            <button onClick={handleDeleteAnn}>Delete</button>
            <button onClick={closeDeleteAnn}>Cancel</button>
          </div>
        </div>
      )}


      <div className="recent-announcements">

        {announcements.map(announcement => {

          return (
            <div key={announcement.id} className="news-cards">
              <div className="news-image">
                <img src={`http://localhost:3000/uploads/${announcement.image}`} />
              </div>
              <div className="news-content">
                <div className="news-content-title">
                  <h3><u>{announcement.title}</u></h3>
                </div>
                <div className="news-content-description">
                  <p>{announcement.message}</p>
                </div>
                <div className="news-content-date">
                  <p>{announcement.createdAt}</p>
                </div>
                <div className="match-type">
                  <h2>{announcement.author}</h2>
                </div>
                <div className="action-btns">
                <button onClick={() => openDeleteAnn(announcement)}>Delete Announcement</button>
              </div>
              </div>
            </div>
          );
        })}

        <div className="pagination">
          <button onClick={() => fetchAnnouncements(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => fetchAnnouncements(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default AnnouncementsManagement