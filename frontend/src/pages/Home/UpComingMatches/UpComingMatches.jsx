import './UpComingMatches.css';
import api from '../../../api/axios';
import formatMatchDate from '../../../formatDate';
import { useEffect, useState } from 'react';

function UpComingMatches() {

  const [matches, setMatches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUpcomingMatches = async () => {
    try {
      
      const response = await api.get('/public/matches?limit=3');

      setMatches(response.data.matches);

    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load Upcoming matches"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUpcomingMatches();
  },[]);

  if (loading) {
    return <p>Loading player profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!matches) {
    return <p>Player profile not found.</p>;
  }


    return(
      <div className='matches-section'>
        <div className='title'>
           <h2>UPCOMING MATCHES</h2>
        </div>
        <div className='match-container'>
          {matches.map(match => {
            return(
               <div key={match.id} className='match-card'>
             <div className='teams'>
               <img src={match.homeImage} />
               <h2>{match.homeTeam}</h2>
               <p>VS</p>
               <h2>{match.awayTeam}</h2>
               <img src={match.awayImage} />
             </div>
             <div className='match-date'>
                <h2>{formatMatchDate(match.matchDate)}</h2>
             </div>
             <div className='match-type'>
               <h2>{match.competition}</h2>
             </div>
             <div className='match-type'>
               <h2>{match.venue}</h2>
             </div>
           </div>
            )
          })}
           

           {/* <div className='match-card'>
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
           </div> */}
        </div>
      </div>
    );
}

export default UpComingMatches