import { NavLink } from "react-router";
import "./AboutSection.css";

function AboutSection() {
  return (
    <div className="about-preview">
      <img src="images/parisfc.png" className="about-section-img" />
      <div className="about-paris">
        <h2>ABOUT PARIS FC</h2>
        <p>Paris Fc is a football club dedicated to excellence, teamwork and player development</p>
        <button className="about-btn">
          <NavLink to="/about" className="nav">Read More</NavLink>
        </button>
      </div>
    </div>
  );
}

export default AboutSection