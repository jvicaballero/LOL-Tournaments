// database.js will be used to connect to the database and export the pool object for use in other files. The pool object will be used to query the database.
import pg from "pg";

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

// A pool keeps a few connections open to the database so that they can be reused, which improves performance. No need to open and close a connection for every query
// Think of it as the phone to my DB, communicate what I need from it
export const pool = new pg.Pool(config);

// Usual flow of pool:
/**
 *  database.js runs once → creates the pool with a few open connections
    matches.js imports it → reuses those same connections
    Every pool.query() call just borrows one of those already-open connections
 */
