import { FaTimes } from "react-icons/fa";

function Sidebar4({closeSideBar4}) {
  return (
    <div className="sidebar-section">
      <button onClick={closeSideBar4}>
        <FaTimes className="X" />
      </button>
      <div className="navigation">
        <ul>
          <li>
            <a href="#overview">Overview</a>
          </li>
          <li>
            <a href="#players">Players</a>
          </li>
          <li>
            <a href="#coaches">Coaches</a>
          </li>
          <li>
            <a href="#matches">Matches</a>
          </li>
          <li>
            <a href="#announcements">Announcements</a>
          </li>
          <li>
            <a href="#accounts">Accounts</a>
          </li>
          <li>
            <a href="#content">Website Content</a>
          </li>
          <li>
            <a href="#profile">Profile</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar4;
