import { pool } from "../config/database.js";

// Tournament table fields: id, round_name, team1_name (default val TBD), team2_name (default val TBD), match_date, match_time

/**
 *  The usual flow of a controller function is to:
 *  1. Create my Query (this case to select all matches from the matches table)
 *  2. Use my already open pool connection to db to query
 *  3.
 *
 */
const getMatches = async (req, res) => {
  try {
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
      ORDER BY match_date, match_time;
      `;
    const result = await pool.query(selectQuery);
    // .rows contains the data I need, otherwise I'll have to result.rows in frontend, this is cleaner.
    // result initially looks like:
    /**
     * 
    rows: [ { id: 1, round_name: 'Play-Ins', team1_name: 'T1', ... } ],
    rowCount: 1,
    command: 'SELECT',
    fields: [ ... ],  // metadata about columns
    ...other pg internals
     */
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMatchById = async (req, res) => {
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
      WHERE id = $1;`;
    const result = await pool.query(selectQuery, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getMatches, getMatchById };
