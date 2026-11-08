import { useState } from "react";
import UpComingMatches from "./UpcomingMatches";
import CompletedMatches from "./CompletedMatches";
import "./matches.css";

function Matches() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="matches-page">

      <div className="matches-header">
        <button
          className={activeTab === "upcoming" ? "active" : ""}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Matches
        </button>

        <button
          className={activeTab === "completed" ? "active" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed Matches
        </button>
      </div>

      <div className="matches-content">
        {activeTab === "upcoming" && <UpComingMatches />}
        {activeTab === "completed" && <CompletedMatches />}
      </div>

    </div>
  );
}

export default Matches;