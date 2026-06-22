import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getVenueById } from "../services/VenuesAPI";
import teamLogos from "../data/teamLogos";
import "../css/MatchCard.css";

const TeamDisplay = ({ name, isWinner, isLoser }) => {
  const isTBD = !name || name === "TBD";
  const logo = teamLogos[name];
  return (
    <div className={`team-display${isWinner ? " winner" : ""}${isLoser ? " loser" : ""}`}>
      {isWinner && <span className="team-victor-label">VICTOR</span>}
      <div className="team-icon">
        {isTBD ? (
          <i className="fa-regular fa-circle-question fa-2x"></i>
        ) : logo ? (
          <img src={logo} alt={name} className="team-logo" />
        ) : (
          <i className="fa-solid fa-shield fa-2x"></i>
        )}
      </div>
      <span className="team-name">{isTBD ? "TBD" : name}</span>
    </div>
  );
};

const MatchCard = ({ match }) => {
  // Destructuring so I don't need to do match.team1_name etc...
  const {
    id,
    round_name,
    team1_name,
    team2_name,
    match_date,
    match_time,
    venue_id,
    winner,
  } = match;
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    if (!venue_id) return;

    const fetchVenue = async () => {
      try {
        const data = await getVenueById(venue_id);
        setVenue(data);
      } catch {
        // venue stays null, location row just won't render
      }
    };

    fetchVenue();
  }, [venue_id]);

  // Cool that this toLocaleDateString knows how to format the dates depending on what string you provide it
  // month - "numeric", "2-digit", "short", "long", "narrow"
  // day - "numeric", "2-digit"
  // year - "numeric", "2-digit"
  // Just has to be provided ISO format ideally
  const formattedDate = new Date(match_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="match-card">
      <p className="match-round">{round_name}</p>
      <div className="match-teams">
        <TeamDisplay
          name={team1_name}
          isWinner={winner === team1_name}
          isLoser={winner && winner !== team1_name}
        />
        <span className="vs">{winner ? "FINAL" : "VS"}</span>
        <TeamDisplay
          name={team2_name}
          isWinner={winner === team2_name}
          isLoser={winner && winner !== team2_name}
        />
      </div>
      <div className="match-meta">
        <p>
          <i className="fa-regular fa-calendar"></i> {formattedDate}
        </p>
        <p>
          <i className="fa-regular fa-clock"></i> {match_time}
        </p>
        {venue && (
          <p>
            <i className="fa-solid fa-location-dot"></i> {venue.name},{" "}
            {venue.city}
          </p>
        )}
      </div>
      <Link to={`/matches/${id}`} role="button" className="match-details-btn">
        View Details
      </Link>
    </article>
  );
};

export default MatchCard;
