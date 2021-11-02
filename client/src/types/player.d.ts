/* Player */

declare namespace Player {
  /** Player Possible States */
  type PlayerStates = "play" | "pause";

  /** Player Modals States */
  type ModalState = "device" | "volume" | "menu";

  /** Player Menu Modal Tabs */
  type MenuTabs = "history" | "search" | "playlist";

  /** Search Results Object */
  interface SearchResults {
    albums: SpotifyApi.PagingObject<Spotify.FullAlbumResults> | undefined;
    playlist:
      | SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>
      | undefined;
    tracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined;
  }

  /* Detailed View Types */

  /** Detailed View States */
  type DetailedViewStates = "album" | "playlist";

  /** Possible Detailed View Results */
  type DetailedView = AlbumResponse | PlaylisResponse | undefined;

  /** Album Response */
  interface AlbumResponse {
    type: "album";
    payload: SpotifyApi.SingleAlbumResponse;
  }
  /** Playlist Response */
  interface PlaylisResponse {
    type: "playlist";
    payload: SpotifyApi.SinglePlaylistResponse;
  }

  /** Possible Detailed View Results Responses */
  type DetailedViewData =
    | SpotifyApi.SingleAlbumResponse
    | SpotifyApi.SinglePlaylistResponse
    | undefined;

  /** Possible Track Results Types */
  type TrackResults =
    | SpotifyApi.TrackObjectSimplified[]
    | SpotifyApi.PlaylistTrackObject[]
    | SpotifyApi.PlayHistoryObject[]
    | undefined;

  type FullTracksResults =
    | SpotifyApi.AlbumTracksResponse
    | SpotifyApi.PlaylistTrackResponse
    | undefined;

  /** Possible Track Context Origin */
  type TrackContext = "detailed" | "search";

  /* Functions */

  /** Handles the Modal Open State
   * @param type - Which Tab should be displayed
   */
  type ModalOpen = (type: ModalState) => void;

  /** Sets the current position in a song.
   * @param e - The mouse event to get the click location
   */
  type SeekPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

  /** Sets the Volume value on Spotify Playback SDK
   * @param VolValue - volume value
   */
  type VolumeHandle = (VolValue: string) => void;

  /** Select Device Handle - switch device & close the modal.
   * @param id - The Spotify Device ID
   */
  type SelectDeviceHandle = (id: string) => void;

  /** Sets The current Detailed View Info
   * @param type - The type of the detailed view, `playlist` or `album`
   * @param id - the `playlist` or `album` ID to fetch data.
   */
  type SetDetailedView = (
    type: DetailedViewStates,
    id: string
  ) => Promise<void>;

  /** Handles the user's action, play/pause a track
   * @param type - the player state `play` or `pause`
   * @param contextURI - `optional` - used to play the selected context (only on `play`)
   * @param trackURI - `optional` - used to play the selected song (only on `play`)
   */
  type PlayerStateHandle = (
    type: PlayerStates,
    contextURI?: string,
    trackURI?: string
  ) => void;

  /**
   * Fetches the remaning tracks (100 each time) and adds it to the global state.
   * @param offset - the starting position of the fetch.
   */
  type LoadTracks = (offset: number) => Promise<void>;
}
