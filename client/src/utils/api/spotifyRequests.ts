import axios, { AxiosResponse } from "axios";

/* AUTH ROUTES */

/**
 * Gets a authorization URL for logging in to the Spotify API.
 * @param pathname - the page that made the request, used for spotify's `redirect` after logging in.
 * @returns an authorize URL to login to Spotify
 */
const getAuthorizeURL = async (pathname: string): Promise<string> => {
  const authorizeURL: AxiosResponse<Spotify.authorizeURL, any> =
    await axios.post("http://localhost:5000/api/spotify/auth/createURL", {
      pathname,
    });
  return authorizeURL.data.url;
};

/**
 * Sends a login request to the server to get all the necessary tokens for api requests.
 * @param code - The authorization code returned in the callback in the Authorization Code flow.
 * @returns object with `access_token`, `refresh_token`, `expires_in`
 */
const getInitialTokens = async (
  code: string
): Promise<Spotify.AuthRequired> => {
  const res: AxiosResponse<Spotify.AuthRequired> = await axios.post(
    "http://localhost:5000/api/spotify/auth/login",
    { code }
  );
  const { access_token, refresh_token, expires_in } = res.data;
  return { access_token, refresh_token, expires_in };
};

/**
 * Requesting a refreshed access token. Spotify returns a new access token to your app
 * @param refreshToken - The refresh token returned from the authorization code exchange
 * @returns new `access_token` and `expires_in` values
 */
const refreshTokens = async (
  refreshToken: string = ""
): Promise<{ access_token: string; expires_in: number }> => {
  const res: AxiosResponse<Spotify.AuthRequired> = await axios.post(
    "http://localhost:5000/api/spotify/auth/refresh",
    { refreshToken }
  );
  const { access_token, expires_in } = res.data;
  return { access_token, expires_in };
};
export { getAuthorizeURL, getInitialTokens, refreshTokens };
