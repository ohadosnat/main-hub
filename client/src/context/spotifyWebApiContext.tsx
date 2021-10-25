import { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spotify from "spotify-web-api-js";
import { setPlayer, setSpotifyName } from "../redux/spotify";
import { selectUser } from "../redux/store";

// Context Types
interface Context {
  getMyDevices?: () => Promise<SpotifyApi.UserDevice[] | undefined>;
  getPlaybackState?: () => Promise<void>;
  selectDevice?: (id: string) => Promise<void>;
  setVolume?: (value: number) => Promise<void>;
  setPosition?: (position: number) => Promise<void>;
  togglePlayer?: (type: "play" | "pause") => Promise<void>;
  toggleShuffle?: (state: boolean) => Promise<void>;
  toggleRepeat?: (state: SpotifyApi.PlaybackRepeatState) => Promise<void>;
  skipForward?: () => Promise<void>;
  skipBack?: () => Promise<void>;
}

// Context
const SpotifyWebApiContext = createContext<Context>({});

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

  /**
   * Get Current Playback State and sets it in `Spotify` Global State.
   */
  const getPlaybackState = async () => {
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
  const getMyDevices = async (): Promise<
    SpotifyApi.UserDevice[] | undefined
  > => {
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
  const selectDevice = async (id: string): Promise<void> => {
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
  const setVolume = async (volume_percent: number): Promise<void> => {
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
  const setPosition = async (position: number): Promise<void> => {
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
   */
  const togglePlayer = async (type: "play" | "pause") => {
    try {
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
  const toggleShuffle = async (state: boolean) => {
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
  const toggleRepeat = async (state: SpotifyApi.PlaybackRepeatState) => {
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

  /**
   * Skips to next track in the user’s queue.
   */
  const skipForward = async () => {
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

  /**
   * Skips to previous track in the user’s queue
   */
  const skipBack = async () => {
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

  // Return Values (Functions)
  const values = {
    getPlaybackState,
    getMyDevices,
    selectDevice,
    setVolume,
    setPosition,
    togglePlayer,
    toggleShuffle,
    toggleRepeat,
    skipForward,
    skipBack,
  };
  return (
    <SpotifyWebApiContext.Provider value={values}>
      {children}
    </SpotifyWebApiContext.Provider>
  );
};
