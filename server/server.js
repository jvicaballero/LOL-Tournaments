import express from "express";
import path from "path";
import favicon from "serve-favicon";
import dotenv from "dotenv";

// import the router from your routes file
import matchesRouter from "./routes/matches.js";
import venuesRouter from "./routes/venues.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(favicon(path.resolve("../", "client", "public", "party.png")));
} else if (process.env.NODE_ENV === "production") {
  app.use(favicon(path.resolve("public", "party.png")));
  app.use(express.static("public"));
}

// specify the api path for the server to use
// /api is the prefix for all backend routes — Express combines it with the router's own path
// e.g. app.use('/api', matchesRouter) + router.get('/matches') = GET /api/matches
// This keeps backend routes clearly separate from frontend routes
// Backend: /api/matches/:id → Express returns JSON from DB
app.use("/api", matchesRouter);
app.use("/api", venuesRouter);

// Frontend: /matches/:id → React Router swaps which component renders
// The frontend fetches from the backend like: fetch(`/api/matches/${id}`)

if (process.env.NODE_ENV === "production") {
  app.get("/*", (_, res) => res.sendFile(path.resolve("public", "index.html")));
}

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
