import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISpotifySliceState = {
  authorizeURL: "",
  code: "",
  isReady: false,
  name: "",
  deviceList: [],
  player: undefined,
  currentProgress: 0,
  search: {
    results: undefined,
    detailedView: undefined,
  },
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    /**
     * Sets the authorization code returned in the callback in the Authorization Code flow.
     * @param action - the `code` value
     * @returns an updated state with a valid `code` value.
     */
    setCode: (state, action: PayloadAction<typeof initialState.code>) => {
      return { ...state, code: action.payload };
    },

    /**
     * Sets the authorization URL for logging in to the Spotify API.
     * @param action - the authorization url
     * @returns an updated state with a authorization url
     */
    setAuthorizeURL: (
      state,
      action: PayloadAction<typeof initialState.authorizeURL>
    ) => {
      return { ...state, authorizeURL: action.payload };
    },

    /**
     * Sets the `Spotify WebPlayback SDK` ready value.
     * @param action - the state of `Spotify WebPlayback SDK`
     * @returns the updated state of `Spotify WebPlayback SDK`
     */
    setIsReady: (state, action: PayloadAction<boolean>) => {
      return { ...state, isReady: action.payload };
    },

    /**
     * Sets the user's devices
     * @param action - an array of the user's devices
     * @returns an updated array with the user's current devices
     */
    setDeviceList: (
      state,
      action: PayloadAction<typeof initialState.deviceList>
    ) => {
      return { ...state, deviceList: action.payload };
    },

    /**
     * Sets the user's spotify display name
     * @param action - the user's spotify display name
     * @returns an updated `name` value.
     */
    setSpotifyName: (state, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },

    /**
     * Sets the current track progress
     * @param action - the progress value in the song (in ms)
     * @returns an updated `currentProgress` value.
     */
    setProgress: (state, action: PayloadAction<number>) => {
      return { ...state, currentProgress: action.payload };
    },
    /**
     * Sets the current detailed view info
     * @param action - the current detailed view data, can be either a `playlist`/`album` object or `undefined`
     * @returns an updated value of `search.detailedView`
     */
    setDetailedView: (state, action: PayloadAction<Player.DetailedView>) => {
      return {
        ...state,
        search: { ...state.search, detailedView: action.payload },
      };
    },
    /**
     * Adds new Tracks to the current Detailed View. This happens when a user clicks on the `Load More` button.
     * @param action - the new tracks.
     * @returns an updated value of `search.detailedView.payload.tracks.items`
     */
    addDetailedViewTracks: (
      state,
      action: PayloadAction<
        SpotifyApi.AlbumTracksResponse | SpotifyApi.PlaylistTrackResponse
      >
    ) => {
      if (state.search.detailedView && action.payload) {
        const newTracks = action.payload.items;
        state.search.detailedView.payload.tracks.items.push(
          ...(newTracks as any)
        );
      }
    },
    /**
     * Sets the current search results
     * @param action - the search results from the API request
     * @returns an updated value of `search.results`
     */
    setSearchResults: (state, action: PayloadAction<Player.SearchResults>) => {
      return { ...state, search: { ...state.search, results: action.payload } };
    },

    /**
     * Resets the `state` to the `initialState`
     * @returns the origial `initialState` value
     */
    clearPlayerState: (state) => {
      return { ...initialState };
    },

    /**
     * Sets the user's current player placback state.
     * @param action - the `Playback State` object with all sorts of info.
     * @returns an updated `player` state value.
     */
    setPlayer: (
      state,
      action: PayloadAction<SpotifyApi.CurrentPlaybackResponse>
    ) => {
      const {
        currently_playing_type,
        context,
        item,
        device,
        progress_ms,
        repeat_state,
        shuffle_state,
        timestamp,
        is_playing,
      } = action.payload;
      const data: Spotify.PlaybackState = {
        context: context
          ? {
              external_urls: { spotify: context?.external_urls?.spotify },
              type: context!.type,
              uri: context!.uri,
            }
          : null,
        device: {
          volume_percent: device.volume_percent,
          id: device.id,
          is_active: device.is_active,
        },
        type: currently_playing_type,
        progress_ms,
        repeat_state,
        shuffle_state,
        timestamp,
        is_playing,
        item: {
          external_urls: { spotify: item?.external_urls?.spotify },
          name: item?.name,
          type: item?.type,
          uri: item?.uri,
          id: item?.id,
          duration_ms: item?.duration_ms,
          artists: item?.artists,
          album: item?.album,
        },
      };
      return { ...state, player: { ...data } };
    },
  },
});

export const {
  setCode,
  setAuthorizeURL,
  setPlayer,
  setIsReady,
  setDeviceList,
  setSpotifyName,
  setProgress,
  setDetailedView,
  setSearchResults,
  clearPlayerState,
  addDetailedViewTracks,
} = spotifySlice.actions;
export default spotifySlice.reducer;
