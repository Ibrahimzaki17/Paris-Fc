import { NavLink } from 'react-router';
import './TeamStats.css';

function TeamStats() {

    return(
    <div className='team-stats-container'>
       <div className='team-statistics-text'>
        <h2>TEAM STATISTICS</h2>
       </div>
       <div className='statistics'>
        <div className='stats-box'>
         <NavLink to="/players" className="navlink">
            <h1>25</h1>
           <h2>Players</h2>
         </NavLink>
           
        </div>
        <div className='stats-box'>
           <h1>3</h1>
           <h2>Coaches</h2>
        </div>
        <div className='stats-box'>
           <h1>12</h1>
           <h2>Trophies</h2>
        </div>
        <div className='stats-box'>
           <h1>120</h1>
           <h2>Matches</h2>
        </div>
       </div>
    </div>
    );
}

export default TeamStats