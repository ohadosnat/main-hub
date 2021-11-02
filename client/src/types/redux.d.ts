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
    locationByCoords: [number, number] | [];
  };
  spotify: Spotify.Auth & { isLogged: boolean };
}

/* ---Global--- */

/**
 * `Global` Slice State.
 * @param pageTheme - Current page theme, changes based on the current page.
 * @param containerHeight - The App's `height` value that changes based on the current page/device orientation (`landscape` `portrait`)
 * @param isNight - indicates whether or not the current time is night based on the user's local time.
 * @param message - used to set any message to display to the user (`error`, `warring` and such).
 * @param isLoading - global loading state
 * @param showModal - global state for the popup modal at home page to make sure it won't appear again when closing.
 */
interface IGlobalState {
  pageTheme: string;
  containerHeight: string;
  isNight: boolean;
  message: string;
  isLoading: boolean;
  showModal: boolean;
}

type BackgroundColorPayload = { pathname: string; isNight: boolean };
type ContainerHeightPayload = { pathname: string; locationByName: string };

/* ---Spotify--- */

/**
 * `Spotify` Slice State
 * @param authorizeURL - Gets a authorization URL for logging in to the Spotify API.
 * @param code - The authorization code returned in the callback in the Authorization Code flow.
 * @param isReady - The state of `Spotify WebPlayback SDK`
 * @param name - The current user's Spotify display name
 * @param deviceList - The current user's available devices
 * @param player - the current `Playback State` of the user's spotify player.
 * @param currentProgress - used to store the current track progress.
 */
interface ISpotifySliceState {
  authorizeURL: string;
  code: string;
  isReady: boolean;
  name: string;
  deviceList: SpotifyApi.UserDevice[];
  player: Spotify.PlaybackState | undefined;
  currentProgress: number;
  search: {
    results: Player.SearchResults | undefined;
    detailedView: Player.DetailedView | undefined;
  };
}

/* ---Weather-- */

/** `Weather` Slice State - used in Redux Global State  */
interface WeatherSliceState {
  forecast: Weather.OneCallDataResponse | undefined;
}
