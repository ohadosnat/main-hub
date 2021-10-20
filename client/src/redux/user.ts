import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCSSVariable } from "../utils/colors";
import { updateUserDoc } from "../utils/firesbase/updateUserDoc";

/**
 * `user` slice initial state
 */
const initialState: IUserSliceState = {
  uid: "",
  name: "",
  theme: "light",
  weather: {
    locationByName: "",
    locatoinByCords: [],
  },
  spotify: {
    isLogged: false,
    refresh_token: "",
    access_token: "",
    expires_in: 3600,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Sets the `user`'s state based on the provided data.
     * @param action a `user` object that matches the `UserSliceState` type.
     * @returns an updated state of the `user` state.
     */
    setUser: (
      state,
      action: PayloadAction<IUserSliceState | null>
    ): IUserSliceState => {
      if (action.payload)
        return {
          ...action.payload,
          spotify: {
            ...action.payload.spotify,
            access_token: state.spotify.access_token,
            expires_in: 3600,
          },
        };
      return { ...initialState }; // reset to initial state when logout.
    },
    /**
     * Sets the `user`'s location name based on the `payload`'s value
     * @param payload - the location's name `string`
     * @example setLocationName("New York City")
     */
    setLocationName: (
      state,
      action: PayloadAction<string>
    ): IUserSliceState => {
      return {
        ...state,
        weather: { ...state.weather, locationByName: action.payload },
      };
    },
    /**
     * Sets the `user`'s theme based and the global CSS variable `--color-indicator` on the `payload`'s value.
     * @param payload - the theme type can be either `light` or `dark` - `string`
     * @example setTheme("light")
     */
    setTheme: (
      state,
      action: PayloadAction<typeof initialState.theme>
    ): IUserSliceState => {
      setCSSVariable(
        "--color-indicator",
        action.payload === "light" ? "#006666" : "#ee9ce1"
      );
      state.uid && updateUserDoc(state.uid, { theme: action.payload });
      return { ...state, theme: action.payload };
    },

    /**
     * TODO: update this jsdocs
     * @param state
     * @param action
     * @returns
     */
    setSpotifyCredentials: (
      state,
      action: PayloadAction<typeof initialState.spotify>
    ) => {
      return { ...state, spotify: { ...action.payload } };
    },
  },
});

export const { setLocationName, setTheme, setUser, setSpotifyCredentials } =
  userSlice.actions;
export default userSlice.reducer;
