// Will create my matches db and seed my matches table with the tournament data
import "./dotenv.js";
import { pool } from "./database.js";
import { matchesData } from "../data/matches.js";
import { venuesData } from "../data/venues.js";

const createVenuesTable = async () => {
  const createTableQuery = `
        DROP TABLE IF EXISTS matches;
        DROP TABLE IF EXISTS venues;

        CREATE TABLE IF NOT EXISTS venues (
            id                  SERIAL PRIMARY KEY,
            name                VARCHAR(255),
            city                VARCHAR(255),
            country             VARCHAR(255),
            image               TEXT,
            earliest_match_date DATE
            );`;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 venues table created successfully");
  } catch (error) {
    console.error("⚠️ Error creating venues table:", error);
  }
};

const createMatchesTable = async () => {
  // Create the matches table if it doesn't exist, note default value TBD for undetermined matchups
  // venue_id is a foreign key that references the id column in the venues table
  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS matches (
            id          SERIAL PRIMARY KEY,
            round_name  VARCHAR(100),
            team1_name  VARCHAR(100) DEFAULT 'TBD',
            team2_name  VARCHAR(100) DEFAULT 'TBD',
            match_date  DATE,
            match_time  TIME,
            venue_id    INT REFERENCES venues(id),
            winner      VARCHAR(100)
            );
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 matches table created successfully");
  } catch (error) {
    console.error("⚠️ Error creating matches table:", error);
  }
};

const seedVenuesTable = async () => {
  await createVenuesTable();

  for (const venue of venuesData) {
    const insertQuery = `
            INSERT INTO venues (name, city, country, image, earliest_match_date)
            VALUES ($1, $2, $3, $4, $5);
        `;

    const values = [venue.name, venue.city, venue.country, venue.image, venue.earliest_match_date];
    try {
      await pool.query(insertQuery, values);
      console.log(`✅ Venue data inserted successfully for ${venue.name}`);
    } catch (err) {
      console.error("⚠️ Error inserting venue data:", err);
    }
  }
};

// seedMatchesTable will call createMatchesTable and then insert the tournament data into the matches table
const seedMatchesTable = async () => {
  await createMatchesTable();

  for (const match of matchesData) {
    const insertQuery = `
            INSERT INTO matches (round_name, team1_name, team2_name, match_date, match_time, venue_id, winner)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
        `;

    const values = [
      match.round_name,
      match.team1_name,
      match.team2_name,
      match.match_date,
      match.match_time,
      match.venue_id,
      match.winner ?? null,
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(`✅ Match data inserted successfully for ${match.round_name}`);
    } catch (err) {
      console.error("⚠️ Error inserting match data:", err);
    }
  }
};

// Venues must be seeded first since matches references venue_id
(async () => {
  await seedVenuesTable();
  await seedMatchesTable();
})();
