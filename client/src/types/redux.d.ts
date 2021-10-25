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
 */
interface ISpotifySliceState {
  authorizeURL: string;
  code: string;
  isReady: boolean;
  name: string;
  deviceList: SpotifyApi.UserDevice[];
  player: PlaybackState | undefined;
}

/**
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
interface PlaybackState {
  context: {
    external_urls: { spotify: string | undefined };
    type: "playlist" | "album" | "artist" | "show" | null;
    uri: string | null;
  } | null;
  item: {
    external_urls: { spotify: string | undefined };
    name: string | undefined;
    type: "track" | undefined;
    uri: string | undefined;
    id: string | undefined;
    duration_ms: number | undefined;
    artists: SpotifyApi.ArtistObjectSimplified[] | undefined;
    album: SpotifyApi.AlbumObjectSimplified | undefined;
  };
  device: {
    volume_percent: number | null;
    id: string | null;
    is_active: boolean;
  };
  progress_ms: number | null;
  repeat_state: "off" | "track" | "context";
  shuffle_state: boolean;
  timestamp: number;
  is_playing: boolean;
}

/* Spotify Auth Types */

/**
 * The current user's Spotify auth tokens used for making requests to the Spotify Web API
 */
interface SpotifyAuth {
  refresh_token: string;
  access_token?: string;
  expires_in?: number;
}

type SpotifyAuthRequired = Required<SpotifyAuth>;

interface authorizeURL {
  url: string;
}

/* Spotify WebPlayback SDK */

interface Window {
  onSpotifyWebPlaybackSDKReady(): void;
  Spotify: typeof Spotify;
}

declare namespace Spotify {
  interface Album {
    uri: string;
    name: string;
    images: Image[];
  }

  interface Artist {
    name: string;
    uri: string;
  }

  interface Error {
    message: string;
  }

  type ErrorTypes =
    | "account_error"
    | "authentication_error"
    | "initialization_error"
    | "playback_error";

  interface Image {
    height?: number | null | undefined;
    url: string;
    width?: number | null | undefined;
  }

  interface PlaybackContext {
    metadata: any;
    uri: string | null;
  }

  interface PlaybackDisallows {
    pausing: boolean;
    peeking_next: boolean;
    peeking_prev: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
  }

  interface PlaybackRestrictions {
    disallow_pausing_reasons: string[];
    disallow_peeking_next_reasons: string[];
    disallow_peeking_prev_reasons: string[];
    disallow_resuming_reasons: string[];
    disallow_seeking_reasons: string[];
    disallow_skipping_next_reasons: string[];
    disallow_skipping_prev_reasons: string[];
  }

  interface WebPlaybackState {
    context: PlaybackContext;
    disallows: PlaybackDisallows;
    duration: number;
    paused: boolean;
    position: number;
    loading: boolean;
    /**
     * 0: NO_REPEAT
     * 1: ONCE_REPEAT
     * 2: FULL_REPEAT
     */
    repeat_mode: 0 | 1 | 2;
    shuffle: boolean;
    restrictions: PlaybackRestrictions;
    track_window: PlaybackTrackWindow;
  }

  interface PlaybackTrackWindow {
    current_track: Track;
    previous_tracks: Track[];
    next_tracks: Track[];
  }

  interface PlayerInit {
    name: string;
    getOAuthToken(cb: (token: string) => void): void;
    volume?: number | undefined;
  }

  type ErrorListener = (err: Error) => void;
  type PlaybackInstanceListener = (inst: WebPlaybackInstance) => void;
  type PlaybackStateListener = (s: WebPlaybackState) => void;
  type EmptyListener = () => void;

  type AddListenerFn = ((
    event: "ready" | "not_ready",
    cb: PlaybackInstanceListener
  ) => void) &
    ((event: "autoplay_failed", cb: EmptyListener) => void) &
    ((event: "player_state_changed", cb: PlaybackStateListener) => void) &
    ((event: ErrorTypes, cb: ErrorListener) => void);

  class Player {
    readonly _options: PlayerInit & { id: string };
    constructor(options: PlayerInit);

    connect(): Promise<boolean>;
    disconnect(): void;
    getCurrentState(): Promise<WebPlaybackState | null>;
    getVolume(): Promise<number>;
    nextTrack(): Promise<void>;

    addListener: AddListenerFn;
    on: AddListenerFn;

    removeListener(
      event: "ready" | "not_ready" | "player_state_changed" | ErrorTypes,
      cb?: ErrorListener | PlaybackInstanceListener | PlaybackStateListener
    ): void;

    pause(): Promise<void>;
    previousTrack(): Promise<void>;
    resume(): Promise<void>;
    seek(pos_ms: number): Promise<void>;
    setName(name: string): Promise<void>;
    setVolume(volume: number): Promise<void>;
    togglePlay(): Promise<void>;
  }

  interface Track {
    uri: string;
    id: string | null;
    type: "track" | "episode" | "ad";
    media_type: "audio" | "video";
    name: string;
    is_playable: boolean;
    album: Album;
    artists: Artist[];
  }

  interface WebPlaybackInstance {
    device_id: string;
  }
}
