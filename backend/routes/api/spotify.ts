import express from "express";
import dotenv from "dotenv";
import SpotifyWebApi from "spotify-web-api-node";
import { generateRandomString } from "../../utils/auth";
const router = express.Router();

// Spotify API Auth Route
const spotifyAuthRoute = require("./spotifyAuth");
router.use("/auth", spotifyAuthRoute);

dotenv.config();
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

router.post("/artist", async (req, res) => {
  try {
    const access_token = req.body.access_token;
    spotifyApi.setAccessToken(access_token);
    const data = await spotifyApi.getPlaylistTracks("3ktAYNcRHpazJ9qecm3ptn", {
      offset: 1,
      limit: 5,
      fields: "items",
    });
    res.json({ data: data.body });
  } catch (error) {
    res.status(400).json({ message: error });
  }
  console.log(1, spotifyApi.getRefreshToken());
  spotifyApi
    .getPlaylistTracks("3ktAYNcRHpazJ9qecm3ptn", {
      offset: 1,
      limit: 5,
      fields: "items",
    })
    .then((data) => {
      res.json({ data: data.body });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
