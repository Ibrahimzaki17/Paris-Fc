import './FeaturedPlayers.css';

function FeaturedPlayers() {

    return(
    <div className='featured-section'>
      <div className='featured-title'>
        <h2>FEATURED PLAYERS</h2>
      </div>
      <div className='players-container'>
         <div className='player-card'>
           <div className='player-img'>
             <img src="images/paris.jpg" />
           </div>
           <div className='player-details'>
             <h2>Ibrahim Zaki</h2>
             <p>Defensive Midfielder (DMF)</p>
             <div className='player-number'>
               <span>6</span>
             </div>
           </div>
         </div>
         <div className='player-card'>
           <div className='player-img'>
             <img src="images/messi.jpeg" />
           </div>
           <div className='player-details'>
             <h2>Ibrahim Zaki</h2>
             <p>Defensive Midfielder (DMF)</p>
             <div className='player-number'>
               <span>6</span>
             </div>
           </div>
         </div>
         <div className='player-card'>
           <div className='player-img'>
             <img src="images/coutinho.jpg" />
           </div>
           <div className='player-details'>
             <h2>Ibrahim Zaki</h2>
             <p>Defensive Midfielder (DMF)</p>
             <div className='player-number'>
               <span>6</span>
             </div>
           </div>
         </div>
      </div>
      <div className='view-all-players-btn'>
        <button>View All Players</button>
      </div>
    </div>
    );
}

export default FeaturedPlayers