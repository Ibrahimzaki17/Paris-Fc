import "./AboutPage.css";

function AboutPage() {
  return (
    
    <div className="about-paris">
        <title>About</title>
      <div className="about-title">
        <h2>ABOUT PARIS FC</h2>
      </div>
      <div className="about-hero-img">
        <img src="images/parisfc.png" />
      </div>
      <div className="about-story">
        <h2>Our Story</h2>
        <p>
          Paris FC was founded with the goal of bringing together talented
          football players and creating a culture of teamwork, discipline and
          success.
        </p>
      </div>
      <div className="about-mission-and-vision">
        <div className="about-mission">
          <h2>Mission</h2>
          <p>
            To develop talented footballers and inspire our community through
            the game.
          </p>
        </div>
        <div className="about-vision">
          <h2>Vision</h2>
          <p>
            To become one of the most respected football clubs in the region.
          </p>
        </div>
      </div>
      <div className="core-values">
        <h2>Core Values</h2>
        <ul>
          <li>Teamwork</li>
          <li>Discipline</li>
          <li>Respect</li>
          <li>Excellence</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
