/* Spotify Web API Context Types */

interface SpotifyWebApiContext {
  getMyDevices: () => Promise<SpotifyApi.UserDevice[] | undefined>;
  getPlaybackState: () => Promise<void>;
  selectDevice: (id: string) => Promise<void>;
  setVolume: (value: number) => Promise<void>;
  setPosition: (position: number, device_id: string) => Promise<void>;
  togglePlayerState: (
    playerState: Player.PlayerStates,
    isContext?: boolean,
    contextURI?: string,
    trackURI?: string
  ) => Promise<void>;
  toggleShuffle: (state: boolean) => Promise<void>;
  toggleRepeat: (state: SpotifyApi.PlaybackRepeatState) => Promise<void>;
  skipForward: () => Promise<void>;
  skipBack: () => Promise<void>;
  getRecentlyPlayed: () => Promise<SpotifyApi.PlayHistoryObject[] | undefined>;
  getSearchResults: (
    term: string
  ) => Promise<SpotifyApi.SearchResponse | undefined>;
  fetchAlbum: (
    id: string
  ) => Promise<SpotifyApi.SingleAlbumResponse | undefined>;
  fetchPlaylist: (
    id: string
  ) => Promise<SpotifyApi.SinglePlaylistResponse | undefined>;
  fetchFullTracks: (
    type: Player.DetailedViewStates,
    offset: number,
    id: string
  ) => Promise<Player.FullTracksResults>;
}
