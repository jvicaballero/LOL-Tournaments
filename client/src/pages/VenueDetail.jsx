import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getVenueById } from "../services/VenuesAPI";
import { getMatchesByVenueId } from "../services/MatchesAPI";
import MatchCard from "../components/MatchCard";
import "../css/VenueDetail.css";

const VenueDetail = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pretty much the same pattern here:
    // my async function will await my API calls, this case getVenueById and getMatchesbyVenueId

    const fetchVenueAndMatches = async () => {
      try {
        const venueData = await getVenueById(id);
        const matchesData = await getMatchesByVenueId(id);
        setVenue(venueData);
        setMatches(matchesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenueAndMatches();
  }, [id]);

  if (loading) return <p className="venue-detail-status">Loading...</p>;
  if (error) return <p className="venue-detail-status">Error: {error}</p>;

  return (
    <div className="venue-detail">
      <div
        className="venue-detail-header"
        style={venue.image ? { backgroundImage: `url('${venue.image}')` } : {}}
      >
        <div className="venue-detail-header-overlay">
          <Link to="/" className="back-link">
            ← Back to Venues
          </Link>
          <h2>{venue.name}</h2>
          <p>
            {venue.city}, {venue.country}
          </p>
        </div>
      </div>

      <div className="venue-detail-matches">
        <h3>Matches at this venue</h3>
        <div className="matches-grid">
          {matches.length > 0 ? (
            matches.map((match) => <MatchCard key={match.id} match={match} />)
          ) : (
            <p>No matches scheduled at this venue yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
