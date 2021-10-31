import { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spotify from "spotify-web-api-js";
import { setPlayer, setSpotifyName } from "../redux/spotify";
import { selectUser } from "../redux/store";

// Context
const SpotifyWebApiContext = createContext<SpotifyWebApiContext>(
  {} as SpotifyWebApiContext
);

// Context Hook
export function useSpotifyWebApi() {
  return useContext(SpotifyWebApiContext);
}

// Provider
export const SpotifyWebApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [spotify] = useState(new Spotify());
  const [playerHasAccessToken, setIsToken] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    spotify: { access_token },
  } = useSelector(selectUser);

  // Set user's access token then gets the current user's display name
  useEffect(() => {
    if (!access_token) return;
    spotify.setAccessToken(access_token);
    setIsToken(true);
    spotify
      .getMe()
      .then(
        ({ display_name }) =>
          display_name && dispatch(setSpotifyName(display_name))
      );
  }, [access_token]);

  // Get User's Current Playback every 1 second.
  useEffect(() => {
    if (!playerHasAccessToken) return;
    const interval = setInterval(() => {
      getPlaybackState();
    }, 1000);

    return () => clearInterval(interval);
  }, [playerHasAccessToken]);

  // Handlers

  /** Get Current Playback State and sets it in `Spotify` Global State. */
  const getPlaybackState: SpotifyWebApiContext["getPlaybackState"] =
    async () => {
      try {
        const state = await spotify.getMyCurrentPlaybackState();
        state && dispatch(setPlayer(state));
      } catch (error) {
        const errorMessage: ErrorMessage = {
          message: "Failed to fetch current playback state",
          error,
        };
        console.error(errorMessage);
      }
    };

  /**
   * Gets the user's current available devices
   * @returns an array of devices
   */
  const getMyDevices: SpotifyWebApiContext["getMyDevices"] = async () => {
    try {
      const res = await spotify.getMyDevices();
      return res.devices;
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to fetch your devices",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Transfers the user's playback to the desired device by `id`
   * @param id - the device target `id`
   */
  const selectDevice: SpotifyWebApiContext["selectDevice"] = async (id) => {
    try {
      const deviceList = [id];
      await spotify.transferMyPlayback(deviceList, { play: true });
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to transfer playback to the device",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Sets the device's volume
   * @param volume_percent the volume value, must be from `0` to `100`
   * @example setVolume(42);
   */
  const setVolume: SpotifyWebApiContext["setVolume"] = async (
    volume_percent
  ) => {
    try {
      await spotify.setVolume(volume_percent);
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to set volume",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Seeks to the given position in the user’s currently playing track.
   * @param position - The position in milliseconds to seek to. Must be a positive number.
   */
  const setPosition: SpotifyWebApiContext["setPosition"] = async (position) => {
    try {
      await spotify.seek(Math.floor(position));
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to set seek position",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Toggles the player between `play` state to `pause` state
   * @param type - type of action `play` or `pause`
   * @param trackURI - `optional` - the track that will be played.
   */
  const togglePlayerState: SpotifyWebApiContext["togglePlayerState"] = async (
    type,
    trackURI?
  ) => {
    try {
      if (trackURI && type === "play")
        return await spotify.play({ uris: [trackURI] });
      type === "play" ? await spotify.play() : await spotify.pause();
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to toggle playback state",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Sets the shuffle state based on the `state` argument.
   * @param state - the desired shuffle state
   */
  const toggleShuffle: SpotifyWebApiContext["toggleShuffle"] = async (
    state
  ) => {
    try {
      await spotify.setShuffle(state);
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to toggle shuffle state",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Toggles the Repeat state based on the `state` argument. Cycles between states.
   * @param state - the repeat state, can be `context`, `track`, or `off`
   `
   */
  const toggleRepeat: SpotifyWebApiContext["toggleRepeat"] = async (state) => {
    try {
      state =
        state === "track" ? "context" : state === "context" ? "off" : "track";
      await spotify.setRepeat(state);
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to toggle repeat state",
        error,
      };
      console.error(errorMessage);
    }
  };

  /** Skips to next track in the user’s queue. */
  const skipForward: SpotifyWebApiContext["skipForward"] = async () => {
    try {
      await spotify.skipToNext();
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to skip to the next track",
        error,
      };
      console.error(errorMessage);
    }
  };

  /** Skips to previous track in the user’s queue  */
  const skipBack: SpotifyWebApiContext["skipBack"] = async () => {
    try {
      await spotify.skipToPrevious();
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to skip to the previous track",
        error,
      };
      console.error(errorMessage);
    }
  };

  /** Gets the User Recently Played Tracks (`20`) */
  const getRecentlyPlayed: SpotifyWebApiContext["getRecentlyPlayed"] =
    async () => {
      try {
        const res = await spotify.getMyRecentlyPlayedTracks();
        return res.items;
      } catch (error) {
        const errorMessage: ErrorMessage = {
          message: "Failed to fetch reacntly played tracks",
          error,
        };
        console.error(errorMessage);
      }
    };

  /**
   * Perform a search on the Spotify Web API with the provided `term`. The function only searches for `tracks`, `playlists`, and `albums`.
   * @param term - the search value
   * @returns search results object
   */
  const search: SpotifyWebApiContext["search"] = async (term) => {
    try {
      const res = await spotify.search(term, ["track", "playlist", "album"]);
      return res;
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to search",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Fetches an Album by the provided `id`
   * @param id - the album's ID
   * @returns Album object with all sorts of info.
   */
  const fetchAlbum: SpotifyWebApiContext["fetchAlbum"] = async (id) => {
    try {
      const res = await spotify.getAlbum(id);
      return res;
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to fetch album",
        error,
      };
      console.error(errorMessage);
    }
  };

  /**
   * Fetches a Playlist by the provided `id`
   * @param id - the playlist's ID
   * @returns Playlist object with all sorts of info.
   */
  const fetchPlaylist: SpotifyWebApiContext["fetchPlaylist"] = async (id) => {
    try {
      const res = await spotify.getPlaylist(id);
      return res;
    } catch (error) {
      const errorMessage: ErrorMessage = {
        message: "Failed to fetch album",
        error,
      };
      console.error(errorMessage);
    }
  };

  // Return Values (Functions)
  const values: SpotifyWebApiContext = {
    getPlaybackState,
    getMyDevices,
    selectDevice,
    setVolume,
    setPosition,
    togglePlayerState,
    toggleShuffle,
    toggleRepeat,
    skipForward,
    skipBack,
    getRecentlyPlayed,
    search,
    fetchAlbum,
    fetchPlaylist,
  };
  return (
    <SpotifyWebApiContext.Provider value={values}>
      {children}
    </SpotifyWebApiContext.Provider>
  );
};
