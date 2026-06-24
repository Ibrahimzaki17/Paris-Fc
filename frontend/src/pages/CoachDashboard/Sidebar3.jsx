import './Sidebar3.css';
import { FaTimes } from 'react-icons/fa';

function Sidebar3({closeSideBar3}) {

    return(
      <div className='sidebar-section'>
      
              <button onClick={closeSideBar3}>
                  <FaTimes className='X' />
              </button>
              <div className='navigation'>
                  <ul>
                      <li><a href="#coach-dashboard">Dashboard</a></li>
                      <li><a href="#players">Players</a></li>
                      <li><a href="#schedule">Training Schedule</a></li>
                      <li><a href="#matches">Matches</a></li>
                      <li><a href="#announcements">Announcements</a></li>
                      <li><a href="#reports">Reports</a></li>
                      <li><a href="#profile">Profile</a></li>
                      <li><a href="#logout">Logout</a></li>
                  </ul>
              </div>
            </div>
    );
}

export default Sidebar3

// turn all these anchor tags into navlink and create their own page after the backend or when the backend needs it
// especially the training schedule