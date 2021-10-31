/* Spotify Web API Context Types */

interface SpotifyWebApiContext {
  getMyDevices: () => Promise<SpotifyApi.UserDevice[] | undefined>;
  getPlaybackState: () => Promise<void>;
  selectDevice: (id: string) => Promise<void>;
  setVolume: (value: number) => Promise<void>;
  setPosition: (position: number) => Promise<void>;
  togglePlayerState: (
    type: Player.PlayerStates,
    trackURI?: string
  ) => Promise<void>;
  toggleShuffle: (state: boolean) => Promise<void>;
  toggleRepeat: (state: SpotifyApi.PlaybackRepeatState) => Promise<void>;
  skipForward: () => Promise<void>;
  skipBack: () => Promise<void>;
  getRecentlyPlayed: () => Promise<SpotifyApi.PlayHistoryObject[] | undefined>;
  search: (term: string) => Promise<SpotifyApi.SearchResponse | undefined>;
  fetchAlbum: (
    id: string
  ) => Promise<SpotifyApi.SingleAlbumResponse | undefined>;
  fetchPlaylist: (
    id: string
  ) => Promise<SpotifyApi.SinglePlaylistResponse | undefined>;
}
