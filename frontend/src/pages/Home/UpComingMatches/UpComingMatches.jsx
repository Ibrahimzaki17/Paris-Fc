import './UpComingMatches.css';

function UpComingMatches() {

    return(
      <div className='matches-section'>
        <div className='title'>
           <h2>UPCOMING MATCHES</h2>
        </div>
        <div className='match-container'>
           <div className='match-card'>
             <div className='teams'>
               <img src="images/parisfc.png" />
               <h2>Paris Fc</h2>
               <p>VS</p>
               <h2>Eagles Fc</h2>
               <img src="images/paris.jpg" />
             </div>
             <div className='match-date'>
                <h2>25 July 2026</h2>
             </div>
             <div className='match-type'>
               <h2>League Match</h2>
             </div>
           </div>
           <div className='match-card'>
             <div className='teams'>
               <img src="images/parisfc.png" />
               <h2>Paris Fc</h2>
               <p>VS</p>
               <h2>Eagles Fc</h2>
               <img src="images/paris.jpg" />
             </div>
             <div className='match-date'>
                <h2>25 July 2026</h2>
             </div>
             <div className='match-type'>
               <h2>League Match</h2>
             </div>
           </div>
           <div className='match-card'>
             <div className='teams'>
               <img src="images/parisfc.png" />
               <h2>Paris Fc</h2>
               <p>VS</p>
               <h2>Eagles Fc</h2>
               <img src="images/paris.jpg" />
             </div>
             <div className='match-date'>
                <h2>25 July 2026</h2>
             </div>
             <div className='match-type'>
               <h2>League Match</h2>
             </div>
           </div>
        </div>
      </div>
    );
}

export default UpComingMatches