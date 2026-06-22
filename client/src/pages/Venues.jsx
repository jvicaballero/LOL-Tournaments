import React, { useState, useEffect } from "react";
import VenueCard from "../components/VenueCard";
import { getVenues } from "../services/VenuesAPI";
import "../css/VenueCard.css";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        setVenues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) return <p className="matches-status">Loading venues...</p>;
  if (error) return <p className="matches-status">Error: {error}</p>;

  return (
    <div className="venues-page">
      <h2>Venues</h2>
      <div className="venues-grid">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default Venues;
