import "./Footer.css";
import { FaFacebook,FaInstagram,FaTwitter,FaYoutube,FaTiktok } from "react-icons/fa";
import { NavLink } from "react-router";

function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-column">
        <div className="club-info">
          <div className="logo-and-name">
            <img src="images/parisfc.png" />
            <h2>Paris Fc</h2>
          </div>
          <div className="club-motto">
            <p>Fight till we win</p>
          </div>
        </div>
        <div className="quick-links">
          <h2>Quick Links</h2>
          <nav className="nav">
            <NavLink className="NavLink" to="/">
              Home
            </NavLink>
            <NavLink className="NavLink" to="/about">
              About
            </NavLink>
            <NavLink className="NavLink" to="/trophies">
              Trophies
            </NavLink>
            <NavLink className="NavLink" to="/contact">
              Contact
            </NavLink>
            <NavLink className="NavLink" to="/players">
            Players
          </NavLink>
          <NavLink className="NavLink" to="/coach">
            Coach
          </NavLink>
          </nav>
        </div>
        <div className="contact1-info">
            <h2>Contact</h2>
            <p>ParisFc@gmail.com</p>
            <p>0722851097</p>
            <p>Garissa</p>
        </div>
      </div>
      <hr />
      <div className="socials">
        <h2>Follow Paris Fc</h2>
        <FaFacebook className="facebook"/>
        <FaInstagram className="instagram" />
        <FaTwitter className="twitter" />
        <FaYoutube className="youtube"/>
        <FaTiktok className="tiktok" />
      </div>
      <hr />
      <div className="copyright-section">
        <p>&copy; {new Date().getFullYear()} Paris Fc. All Rights Reserved</p>
        <p>Created by Ibrahim Zaki</p>
      </div>
    </div>
  );
}

export default Footer;
