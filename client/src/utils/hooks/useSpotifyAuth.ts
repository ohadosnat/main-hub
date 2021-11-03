import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setAuthorizeURL } from "../../redux/spotify";
import { selectSpotify, selectUser } from "../../redux/store";
import { setSpotifyCredentials } from "../../redux/user";
import {
  getAuthorizeURL,
  refreshTokens,
  getInitialTokens,
} from "../api/spotifyRequests";
import { updateUserDoc } from "../firesbase/updateUserDoc";

/**
 * A hook used for calling any Spotfiy API auth related functions.
 * @function `generateAuthorizeURL` - generates a new authorization url for logging in to Spotify
 * @function `spotifyLogin` - Perfom a login request to Spotify API. Fires after `generateAuthorizeURL` is clicked
 * @function `refreshAccessToken` - Requset a new Access Token from the server with the user's `Refresh Token`.
 */
const useSpotifyAuth = () => {
  const { pathname } = useLocation();

  // Global State
  const user = useSelector(selectUser);
  const { code } = useSelector(selectSpotify);
  const { access_token, refresh_token, expires_in, isLogged } = user.spotify;
  const dispatch = useDispatch();

  /**
   * Generates a new authorization url for logging in to Spotify
   * @param pathname - he page that made the request, used for spotify's `redirect` after logging in.
   */
  const generateAuthorizeURL = async (pathname: string): Promise<void> => {
    try {
      const url: string = await getAuthorizeURL(pathname);
      dispatch(setAuthorizeURL(url));
    } catch (error) {
      const errorMessage = {
        message: "an error occurred while generating a authorization URL",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Perfom a login request to Spotify API. Fires after `generateAuthorizeURL`.
   * @param code - The authorization code returned in the callback in the Authorization Code flow.
   * @fires `setSpotifyCredentials` - updates the local `user` state with the new tokens.
   * @fires `updateUserDoc` - updates the `Firebase` user doc with the user's `Refresh Token` and login state.
   */
  const spotifyLogin = async (code: string): Promise<void> => {
    try {
      const userCreds: Spotify.AuthRequired = await getInitialTokens(code);
      updateUserDoc(user.uid, {
        spotify: { isLogged: true, refresh_token: userCreds.refresh_token },
      });
      window.history.pushState(null, "", window.location.pathname);
    } catch (error) {
      const errorMessage = {
        message: "an error occurred while logging in to your Spotify account",
        error,
      };
      console.error(errorMessage);
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  /**
   * Requset a new Access Token from the server with the user's `Refresh Token`.
   * @param refresh_token - The user's `Refresh Token`, used to get a new `Access Token`
   * @fires `setSpotifyCredentials` - updates the local `user` state with the new tokens.
   */
  const refreshAccessToken = async (refresh_token: string) => {
    try {
      const res = await refreshTokens(refresh_token);
      dispatch(
        setSpotifyCredentials({
          ...user.spotify,
          access_token: res.access_token,
          expires_in: res.expires_in,
        })
      );
    } catch (error) {
      const errorMessage = {
        message: "an error occurred while getting your Spotify access token",
        error,
      };
      console.error(errorMessage);
    }
  };

  /* --useStates-- */

  // Initial State.
  useEffect(() => {
    if (isLogged) return;
    generateAuthorizeURL(pathname);
  }, [isLogged]);

  // After the user clicks the authorization url, send a login request to the server.
  useEffect(() => {
    if (!code || !user.uid) return;
    spotifyLogin(code);
  }, [code, user.uid]);

  useEffect(() => {
    // when user is empty, don't do anything
    if (!refresh_token || !expires_in) return;

    // gets the current access code, when the user object first loads.
    if (!access_token) refreshAccessToken(refresh_token);

    // after that user loads and have a current access token, start the timer.
    const interval = setInterval(
      () => refreshAccessToken(refresh_token),
      (expires_in - 60) * 500
    );
    return () => clearInterval(interval); // cleanup
  }, [refresh_token, expires_in, access_token]);
};

export default useSpotifyAuth;
