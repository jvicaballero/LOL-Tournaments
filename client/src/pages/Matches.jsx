import React, { useState, useEffect } from "react";
import MatchCard from "../components/MatchCard";
import { getAllMatches } from "../services/MatchesAPI";
import { getVenues } from "../services/VenuesAPI";
import "../css/Matches.css";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await getAllMatches();
        const venueData = await getVenues();
        setMatches(matchData);
        setVenues(venueData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="matches-status">Loading matches...</p>;
  if (error) return <p className="matches-status">Error: {error}</p>;

  const visibleMatches = selectedVenueId === "all"
    ? matches
    : matches.filter((m) => String(m.venue_id) === selectedVenueId);

  return (
    <div className="matches-page">
      <div className="matches-header">
        <h2>Matches</h2>
        <select
          className="venue-filter"
          value={selectedVenueId}
          onChange={(e) => setSelectedVenueId(e.target.value)}
        >
          <option value="all">All Venues</option>
          {venues.map((venue) => (
            <option key={venue.id} value={String(venue.id)}>
              {venue.name} — {venue.city}
            </option>
          ))}
        </select>
      </div>
      <div className="matches-grid">
        {visibleMatches.length > 0
          ? visibleMatches.map((match) => <MatchCard key={match.id} match={match} />)
          : <p>No matches at this venue.</p>
        }
      </div>
    </div>
  );
};

export default Matches;
