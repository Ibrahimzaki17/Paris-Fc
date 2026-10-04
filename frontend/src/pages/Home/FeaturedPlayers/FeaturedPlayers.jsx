import { useEffect, useState } from 'react';
import './FeaturedPlayers.css';
import api from '../../../api/axios';

function FeaturedPlayers() {

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFeaturedPlayers = async () => {
    try {
      const response = await api.get('/public/players?limit=3');

      setPlayers(response.data.players)

    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load player profile"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeaturedPlayers();
  }, [])

  if (loading) {
    return <p>Loading player profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!players) {
    return <p>Player profile not found.</p>;
  }


  return (
    <div className='featured-section'>
      <div className='featured-title'>
        <h2>FEATURED PLAYERS</h2>
      </div>

      <div className='players-container'>
        {players.map(player => {
          return (
            
            <div key={player.id} className='player-card'>
              <div className='player-img'>
                <img src={player.image} />
              </div>
              <div className='player-details'>
                <h2>{player.fullname}</h2>
                <p>{player.position}</p>
                <div className='player-number'>
                  <span>{player.jerseyNumber}</span>
                </div>
              </div>
            </div>
           
          )
        })}
        
      </div>
      <div className='view-all-players-btn'>
        <button>View All Players</button>
      </div>
    </div>
  );
}

export default FeaturedPlayers