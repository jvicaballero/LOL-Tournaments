import React from "react";
import { Link } from "react-router-dom";
import "../css/VenueCard.css";

const VenueCard = ({ venue }) => {
  const { id, name, city, country, image } = venue;

  return (
    <Link to={`/venues/${id}`} className="venue-card-link">
      <article
        className="venue-card"
        style={image ? { backgroundImage: `url('${image}')` } : {}}
      >
        <div className="venue-card-overlay">
          <h3 className="venue-card-name">{name}</h3>
          <p className="venue-card-location">{city}, {country}</p>
        </div>
      </article>
    </Link>
  );
};

export default VenueCard;
