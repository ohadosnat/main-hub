import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISpotifySliceState = {
  authorizeURL: "",
  code: "",
  player: {
    webPlayerback: null,
    webApi: null,
  },
};

const spotifySlice = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<typeof initialState.code>) => {
      return { ...state, code: action.payload };
    },
    setAuthorizeURL: (
      state,
      action: PayloadAction<typeof initialState.authorizeURL>
    ) => {
      return { ...state, authorizeURL: action.payload };
    },
  },
});

export const { setCode, setAuthorizeURL } = spotifySlice.actions;
export default spotifySlice.reducer;
