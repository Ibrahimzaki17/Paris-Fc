import './Contacts.css'
import api from '../../api/axios';
import { useState } from 'react';

function Contacts() {

    const [message, setMessage] = useState({
        name: "",
        email: "",
        message: "",
    });

    //success state
    const [formSuccess, setFormSuccess] = useState("");

    //error states
    const [formError, setFormError] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    //Adding players
    const handleChange1 = (e) => {
        setMessage({
        ...message,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmitMessage = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/public/messages', message);
            setFormError("");
            setValidationErrors([]);
            setFormSuccess(response.data.message || "Message sent successfully");

            setTimeout(() => {
                setMessage({
                    name: "",
                    email: "",
                    message: ""
                })
                setFormError("");
                setValidationErrors([]);
                setFormSuccess("");
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

    return(
      <div className='contact-section'>
        <div className='contact-title'>
            <h2>CONTACT PARIS FC</h2>
        </div>
        <div className='contact-message'>
           <h2>Get In Touch</h2>
           <p>We'd Love to hear from you</p>
        </div>
        <div className='contact-container'>
           <div className='contact-info'>
            <img src="images/messi.jpeg" className="contact-bg-image" />
            <div className='contact-overlay'>
                <span><h2>Contact Information</h2></span>
                <p>ParisFc@gmail.com</p>
                <p>0722851097</p>
                <p>Garissa</p>
           </div>
            </div>
             
           <div className='contact-form'>
            <h2>Contact Form</h2>
             <form onSubmit={handleSubmitMessage} >
                <div className='form1-group'>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        placeholder='Enter your name' 
                        name='name'
                        value={message.name}
                        onChange={handleChange1}
                        />
                        {validationErrors.find((err) => err.field === "name") && (
                            <p className="form-error">
                            {
                                validationErrors.find((err) => err.field === "name")
                                .message
                            }
                            </p>
                        )}
                    <label htmlFor="name">Email</label>
                    <input 
                        type="email" 
                        placeholder='Enter your email' 
                        name='email'
                        value={message.email}
                        onChange={handleChange1}
                        />
                        {validationErrors.find((err) => err.field === "email") && (
                            <p className="form-error">
                            {
                                validationErrors.find((err) => err.field === "email")
                                .message
                            }
                            </p>
                        )}
                    <label htmlFor="message">Message</label>
                    <textarea  
                        placeholder='Your message' 
                        name='message'
                        value={message.message} 
                        onChange={handleChange1}
                        ></textarea>
                        {validationErrors.find((err) => err.field === "message") && (
                            <p className="form-error">
                            {
                                validationErrors.find((err) => err.field === "message")
                                .message
                            }
                            </p>
                        )}

                        {formSuccess && <p className="success">{formSuccess}</p>}

                        {formError && <p className="form-error">{formError}</p>}

                </div>
                <button type='submit'>Send Message</button>
             </form>
           </div>
          
        </div>
        <div className='map-section'>
            <h2>map section</h2>
        </div>
      </div>
    );
}

export default Contacts