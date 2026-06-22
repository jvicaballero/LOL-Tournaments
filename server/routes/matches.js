import express from "express";
import { getMatches, getMatchById } from "../controllers/matches.js";

const router = express.Router();

router.get("/matches", getMatches);
router.get("/matches/:id", getMatchById);

export default router;
