import express from "express";
import dotenv from "dotenv";
import SpotifyWebApi from "spotify-web-api-node";
import { generateRandomString } from "../../utils/auth";
const router = express.Router();

dotenv.config();
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// TODO: might change the scopes later on.
const scopes: string[] = [
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-private",
  "user-library-modify",
  "streaming",
];

// Base SpotifyWebApi Client
const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

//Retrieve a URL where the user can give the application permissions.
router.get("/createURL", (req, res) => {
  spotifyApi.setRedirectURI(`https://main-hub.netlify.app/settings`);
  const url = spotifyApi.createAuthorizeURL(scopes, generateRandomString(16));
  res.json({ url });
});

// Perfom a login action - Request an access token using the Authorization Code flow.
router.post("/login", async (req, res) => {
  const callbackError = req.body.error;
  const code: string = req.body.code as string;

  if (callbackError) {
    res.status(400).json({ message: callbackError });
    res.end();
  }

  try {
    const tokens = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = tokens.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.json({ access_token, refresh_token, expires_in });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Request a new Access Token with the provided Refresh Token
router.post("/refresh", async (req, res) => {
  try {
    const refreshtoken = req.body.refreshToken;
    spotifyApi.setRefreshToken(refreshtoken);
    const token = await spotifyApi.refreshAccessToken();
    const { access_token, expires_in } = token.body;

    res.json({ access_token, expires_in });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
