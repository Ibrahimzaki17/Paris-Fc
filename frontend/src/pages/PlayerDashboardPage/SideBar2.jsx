import './SideBar2.css';
import { FaTimes } from 'react-icons/fa';

function SideBar2({closeSideBar2}) {

    return(
      <div className='sidebar-section'>

        <button onClick={closeSideBar2}>
            <FaTimes className='X' />
        </button>
        <div className='navigation'>
            <ul>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#announcements">Announce</a></li>
                <li><a href="#schedule">Schedule</a></li>
                <li><a href="#matches">Matches</a></li>
                <li><a href="#profile">Profile</a></li>
            </ul>
        </div>
      </div>
    );
}

export default SideBar2