import { pool } from "../config/database.js";

// Venues table fields: id, name, city, country, image

const getVenues = async (req, res) => {
  // I want to show the venues depending on the earliest date of a matchup, so just adding a new date in my venues table and order ASC for earliest date.
  try {
    const selectQuery = `SELECT
            id,
            name,
            city,
            country,
            image,
            earliest_match_date
            FROM venues
            ORDER BY earliest_match_date ASC NULLS LAST;
`;
    const result = await pool.query(selectQuery);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVenueById = async (req, res) => {
  try {
    const { id } = req.params;
    const selectQuery = `SELECT
            id,
            name,
            city,
            country,
            image
            FROM venues
            WHERE id = $1;`;

    // Pool.query can have 2 args, but since we usually have a separate values[], this looked different
    // Will have just the 1 [id] here and other fns.
    const result = await pool.query(selectQuery, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Venue not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Need to return all the matches based on venue_id
// Lets order it by earliest matches
const getMatchesByVenueId = async (req, res) => {
  try {
    const { id } = req.params;
    const selectQuery = `SELECT
            id,
            round_name,
            team1_name,
            team2_name,
            match_date,
            match_time,
            venue_id,
            winner
            FROM matches
            WHERE venue_id = $1
            ORDER BY match_date, match_time;`;
    const result = await pool.query(selectQuery, [id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching matches for venue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getVenues, getVenueById, getMatchesByVenueId };
