import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISpotifySliceState = {
  authorizeURL: "",
  code: "",
  isReady: false,
  name: "",
  deviceList: [],
  player: undefined,
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
        context,
        item,
        device,
        progress_ms,
        repeat_state,
        shuffle_state,
        timestamp,
        is_playing,
      } = action.payload;
      const data: PlaybackState = {
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
  clearPlayerState,
} = spotifySlice.actions;
export default spotifySlice.reducer;
