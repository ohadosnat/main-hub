import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSliceState } from "../types/redux/users";

const initialState: UserSliceState = {
  uid: "1234",
  name: "ohad",
  theme: "light",
  weather: {
    locationByName: undefined,
    locatoinByCords: undefined,
  },
  player: {
    spotifyRefreshToken: undefined,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLocationName: (state, action: PayloadAction<string>) => {
      state.weather.locationByName = action.payload;
    },
    setTheme: (state, action: PayloadAction<typeof initialState.theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setLocationName, setTheme } = userSlice.actions;
export default userSlice.reducer;
