import './Contacts.css'

function Contacts() {

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
             <form >
                <div className='form1-group'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' placeholder='Enter your name' required/>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='Enter your email' required />
                    <label htmlFor="message">Message</label>
                    <textarea  id="message" placeholder='Your message' required></textarea>
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