import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSliceState {
  uid: string;
  name: string;
  theme: "light" | "dark";
  weather: {
    locationByName: string | undefined;
    locatoinByCords: [number, number] | undefined;
  };
  player: {
    spotifyRefreshToken: string | undefined;
  };
}

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
