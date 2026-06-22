import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMatchById } from "../services/MatchesAPI";
import { getVenueById } from "../services/VenuesAPI";
import teamLogos from "../data/teamLogos";
import "../css/Matches.css";

const TeamBlock = ({ name, isWinner, isLoser }) => {
  const isTBD = !name || name === "TBD";
  const logo = teamLogos[name];
  return (
    <div className={`team-block${isWinner ? " winner" : ""}${isLoser ? " loser" : ""}`}>
      {isWinner && <span className="team-victor-label">VICTOR</span>}
      {isTBD ? (
        <i className="fa-regular fa-circle-question fa-4x"></i>
      ) : logo ? (
        <img src={logo} alt={name} className="team-logo-large" />
      ) : (
        <i className="fa-solid fa-shield fa-4x"></i>
      )}
      <h3>{isTBD ? "TBD" : name}</h3>
    </div>
  );
};

const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const data = await getMatchById(id);
        setMatch(data);
        if (data.venue_id) {
          const venueData = await getVenueById(data.venue_id);
          setVenue(venueData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) return <p className="matches-status">Loading match...</p>;
  if (error) return <p className="matches-status">Error: {error}</p>;

  const formattedDate = new Date(match.match_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { winner, team1_name, team2_name } = match;

  return (
    <div className="match-detail">
      <Link to="/matches" className="back-link">← Back to Matches</Link>
      <p className="match-detail-round">{match.round_name}</p>
      <div className="match-detail-teams">
        <TeamBlock
          name={team1_name}
          isWinner={winner === team1_name}
          isLoser={winner && winner !== team1_name}
        />
        <span className="vs-large">{winner ? "FINAL" : "VS"}</span>
        <TeamBlock
          name={team2_name}
          isWinner={winner === team2_name}
          isLoser={winner && winner !== team2_name}
        />
      </div>
      <div className="match-detail-info">
        <p><i className="fa-regular fa-calendar"></i> {formattedDate}</p>
        <p><i className="fa-regular fa-clock"></i> {match.match_time}</p>
        {venue && <p><i className="fa-solid fa-location-dot"></i> {venue.name}, {venue.city}</p>}
      </div>
    </div>
  );
};

export default MatchDetail;
