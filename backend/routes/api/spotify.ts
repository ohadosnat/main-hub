import express from "express";
import dotenv from "dotenv";
const router = express.Router();

// Spotify API Auth Route
const spotifyAuthRoute = require("./spotifyAuth");
router.use("/auth", spotifyAuthRoute);

dotenv.config();

module.exports = router;
