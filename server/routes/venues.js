import express from "express";
import { getVenues, getVenueById, getMatchesByVenueId } from "../controllers/venues.js";

const router = express.Router();

router.get("/venues", getVenues);
router.get("/venues/:id", getVenueById);
router.get("/venues/:id/matches", getMatchesByVenueId);

export default router;
