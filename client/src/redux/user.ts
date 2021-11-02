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
    locationByCoords: [],
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
     * Sets the `user`'s LOCAL state based on the provided data.
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
     * Sets the `user`'s doc location name value based on the `payload`'s value
     * @param payload - the location's name `string`
     * @example setLocationName("New York City")
     */
    setLocationName: (state, action: PayloadAction<string>) => {
      updateUserDoc(state.uid, { "weather.locationByName": action.payload });
    },
    /**
     * Updates the Location's coordinates on `Firestore`
     * @param action - `latitude` and `longitude` values
     * @exampe setLocationCoords({lat: 34, lon: 42})
     */
    setLocationCoords: (state, action: PayloadAction<Weather.Coord>) => {
      const { lat, lon } = action.payload;
      updateUserDoc(state.uid, {
        "weather.locationByCoords": [lat, lon],
      });
    },
    /**
     * Sets the `user`'s doc theme value based and the global CSS variable `--color-indicator` on the `payload`'s value.
     * @param payload - the theme type can be either `light` or `dark` - `string`
     * @example setTheme("light")
     */
    setTheme: (state, action: PayloadAction<typeof initialState.theme>) => {
      const theme = action.payload;
      const cssVariable = "--color-indicator";
      setCSSVariable(cssVariable, theme === "light" ? "#006666" : "#ee9ce1");
      if (state.uid) return updateUserDoc(state.uid, { theme: action.payload });
      return { ...state, theme: action.payload };
    },

    /**
     * Sets the user's spotify credentials to the LOCAL state.
     * @param action - The user's spotify credentials (`SpotifyAuth` type object with `isLogged` propetry).
     * @returns the state and sets the `spotify` property to the values provided in the `payload`.
     * @example
     * setSpotifyCredentials({ isLogged: true, access_token: "123456", refresh_token: "123456", expires_in: 3600 })
     */
    setSpotifyCredentials: (
      state,
      action: PayloadAction<typeof initialState.spotify>
    ) => {
      return { ...state, spotify: { ...action.payload } };
    },

    /**
     * Clears the user's spotify credentials from both the local state and database (`Firestore`).
     * @param action - the user's `uid`, used to for a reference to update the document.
     * @returns the state and a "default" values for the `spotify` property.
     */
    clearSpotifyCredentials: (state, action: PayloadAction<string>) => {
      const uid = action.payload;
      updateUserDoc(uid, { spotify: { isLogged: false, refresh_token: "" } });
      return {
        ...state,
        spotify: { isLogged: false, access_token: "", refresh_token: "" },
      };
    },
  },
});

export const {
  setLocationName,
  setLocationCoords,
  setTheme,
  setUser,
  setSpotifyCredentials,
  clearSpotifyCredentials,
} = userSlice.actions;
export default userSlice.reducer;
