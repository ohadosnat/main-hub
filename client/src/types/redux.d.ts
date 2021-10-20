/* ---User--- */

/**
 * `User` Slice State.
 * @param uid - The user ID, generated from `Firebase`.
 * @param name - The user name, provided on sign up.
 * @param theme - The user preference, can be either `light` or `dark`. Default is `light`.
 * @param weather - Stores information about the user's weather location.
 * @param spotify - Stores information about the user's spotify auth status and tokens.
 */
interface IUserSliceState {
  uid: string;
  name: string;
  theme: "light" | "dark";
  weather: {
    locationByName: string;
    locatoinByCords: [number, number] | [];
  };
  spotify: SpotifyAuth & { isLogged: boolean };
}

/* ---Global--- */

/**
 * `Global` Slice State.
 * @param pageTheme - Current page theme, changes based on the current page.
 * @param containerHeight - The App's `height` value that changes based on the current page/device orientation (`landscape` `portrait`)
 * @param isNight - indicates whether or not the current time is night based on the user's local time.
 */
interface IStylesState {
  pageTheme: string;
  containerHeight: string;
  isNight: boolean;
}

type BackgroundColorPayload = { pathname: string; isNight: boolean };
type ContainerHeightPayload = { pathname: string; locationByName: string };

/* ---Spotify--- */

/**
 * `Spotify` Slice State
 * @param authorizeURL - Gets a authorization URL for logging in to the Spotify API.
 * @param code - The authorization code returned in the callback in the Authorization Code flow.
 * @param player - 👈 TODO: update this state.
 */
interface ISpotifySliceState {
  authorizeURL: string;
  code: string;
  player: {
    webPlayerback: WebPlaybackState | null;
    webApi: null;
  };
}

/* Spotify Auth Types */

interface SpotifyAuth {
  refresh_token: string;
  access_token?: string;
  expires_in?: number;
}

type SpotifyAuthRequired = Required<SpotifyAuth>;

interface authorizeURL {
  url: string;
}

// 👇 TODO: update types 👇
// Spotify WebPlayback

declare enum repeat_mode {
  noRepeat,
  repeatContext,
  repeatTrack,
}

/**
 * This is an object that is provided every time `Spotify.Player#getCurrentState`
 */
interface WebPlaybackState {
  paused: boolean;
  repeat_mode: repeat_mode;
  shuffle: boolean;
  track_window: {
    current_track: WebPlaybackTrack;
    previous_tracks: WebPlaybackTrack[];
    next_tracks: WebPlaybackTrack[];
  };
}

/**
 * This is an object that is provided inside `track_window` from the `WebPlaybackState` Object.
 * Track objects are Spotify Web API compatible objects containing metadata on Spotify content.
 * @param uri - Spotify URI
 * @param id - Spotify ID from URI (can be `null`)
 * @param type - Content type: can be `track`, `episode` or `ad`
 * @param media_type - Type of file: can be `audio` or `video`
 * @param name - Name of content
 * @param is_playable - Flag indicating whether it can be play
 * @param uri(album) - Spotify Album URI
 */
interface WebPlaybackTrack {
  uri: string;
  id: string | null;
  type: "track" | "episode" | "ad";
  media_type: "audio" | "video";
  name: string;
  is_playable: boolean;
  album: {
    uri: string;
    name: string;
    images: [{ url: string }];
  };
  artists: [{ uri: string; name: string }];
}

/**
 * This is an object that is provided in all error handlers from the Web Playback SDK.
 */
interface WebPlaybackError {
  message: string;
}
