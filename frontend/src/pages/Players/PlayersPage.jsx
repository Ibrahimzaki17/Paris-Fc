import "./PlayersPage.css";

function PlayersPage() {
  return (
    <div className="players-page">
      <title>Players</title>
      <div className="squad-title">
        <h2>PARIS FC SQUAD</h2>
      </div>

      

      <div className="link-section">
        <ul>
            <li><a href="#gk-section">GoalKeepers</a></li>
            <li><a href="#defenders-section">Defenders</a></li>
            <li><a href="#midfield-section">Midfielders</a></li>
            <li><a href="#forward-section">Forwards</a></li>
        </ul>
      </div>

      

      <div className="player-card-section">
        <div className="gk-section" id="gk-section">
          <div className="gk-title">
            <h2>Goalkeepers</h2>
          </div>

          <div className="players-container">
            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>

            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>

            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div className="defenders-section" id="defenders-section">
          <div className="df-title">
            <h2>Defenders</h2>
          </div>

          <div className="players-container">
            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>

            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>

            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div className="midfield-section" id="midfield-section">
          <div className="mf-title">
            <h2>Midfielders</h2>
          </div>

          <div className="players-container">
            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>

            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>

            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div className="forward-section" id="forward-section">
          <div className="fw-title">
            <h2>Forwards</h2>
          </div>

          <div className="players-container">
            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>

            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>

            <div className="player-card">
              <div className="player-img">
                <img src="images/paris.jpg" />
              </div>
              <div className="player-details">
                <h2>Ibrahim Zaki</h2>
                <p>Defensive Midfielder (DMF)</p>
                <div className="player-number">
                  <span>6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayersPage;
