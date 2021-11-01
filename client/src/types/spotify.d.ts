/* Spotify General */

declare namespace Spotify {
  /* Spotify Auth Types */

  /** The current user's Spotify auth tokens used for making requests to the Spotify Web API */
  interface Auth {
    refresh_token: string;
    access_token?: string;
    expires_in?: number;
  }

  /** Same as Above just with Required fields */
  type AuthRequired = Required<Auth>;

  /** Response from `getAuthorizeURL` to get a new authorization URL */
  interface authorizeURL {
    url: string;
  }

  /* Spotify WebApi Local Types */

  /** Get information about the user’s current playback state, including track or episode, progress, and active device. */
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
    type: "track" | "episode" | "ad" | "unknown";
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

  /** Spotify Web API Track Object (part of it) */
  interface Track {
    name: string;
    duration: string;
    artist: string;
    uri: string;
    id: string;
    isPlaying: boolean;
    is_local: boolean;
  }

  interface SearchResultsArtist {
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }

  interface FullAlbumResults extends SpotifyApi.AlbumObjectSimplified {
    artists: SearchResultsArtist[];
  }

  interface SearchAlbums {
    type: "album";
    payload: SpotifyApi.PagingObject<FullAlbumResults> | undefined;
  }

  interface SearchPlaylists {
    type: "playlist";
    payload:
      | SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>
      | undefined;
  }
}

/* Spotify WebPlayback SDK */

interface Window {
  onSpotifyWebPlaybackSDKReady(): void;
  Spotify: typeof SpotifySDK;
}

declare namespace SpotifySDK {
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
