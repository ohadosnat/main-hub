import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCSSVariable } from "../utils/colors";

const initialState: UserSliceState = {
  uid: "1234",
  name: "ohad",
  theme: "dark",
  weather: {
    locationByName: undefined,
    locatoinByCords: undefined,
  },
  player: {
    spotifyRefreshToken: undefined,
    isLogged: true,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Sets the `user`'s location name based on the `payload`'s value
     * @param payload - the location's name `string`
     * @example setLocationName("New York City")
     */
    setLocationName: (state, action: PayloadAction<string>) => {
      state.weather.locationByName = action.payload;
    },
    /**
     * Sets the `user`'s theme based and the global CSS variable `--color-indicator` on the `payload`'s value.
     * @param payload - the theme type `string`
     * @example setTheme("light")
     */
    setTheme: (state, action: PayloadAction<typeof initialState.theme>) => {
      state.theme = action.payload;
      setCSSVariable(
        "--color-indicator",
        action.payload === "light" ? "#006666" : "#ee9ce1"
      );
    },
  },
});

export const { setLocationName, setTheme } = userSlice.actions;
export default userSlice.reducer;
