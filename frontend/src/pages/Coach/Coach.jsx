import "./Coach.css";

function Coach() {
  return (
    <div className="coach-section">
      <div className="section-title">
        <h2>COACHING STAFF</h2>
      </div>
      <div className="head-coach-section">
        <span>
          <h2>Head Coach</h2>
        </span>
        <div className="coach-card">
          <img src="images/messi.jpeg" />
          <div className="details">
            <h2>Ibrahim Zaki</h2>
            <p>Manager</p>
            <p>
              Prefers possession-based football with high pressing and quick
              passing transitions.
            </p>
          </div>
        </div>
      </div>
      <div className="assistant-coach-section">
        <span>
          <h2>Assistant Coaches</h2>
        </span>

        <div className="assistant-coach-card">
          <div className="assistant-coach-card">
            <img src="images/messi.jpeg" />
            <div className="coach-details">
              <h2>Immobile</h2>
              <p>Assistant Coach</p>
            </div>
          </div>

          <div className="assistant-coach-card">
            <img src="images/messi.jpeg" />
            <div className="coach-details">
              <h2>Immobile</h2>
              <p>Assistant Coach</p>
            </div>
          </div>

          <div className="assistant-coach-card">
            <img src="images/messi.jpeg" />
            <div className="coach-details">
              <h2>Immobile</h2>
              <p>Assistant Coach</p>
            </div>
          </div>
        </div>
      </div>

      <div className="philosophy-section">
        <h2>Coaching Philosophy</h2>
        <p>Discipline, teamwork and excellence</p>
      </div>
    </div>
  );
}

export default Coach;
