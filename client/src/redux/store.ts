import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import globalReducer from "./global";
import spotifyReducer from "./spotify";
import weatherReducer from "./weather";

const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
    spotify: spotifyReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.user;
export const selectGlobal = (state: RootState) => state.global;
export const selectSpotify = (state: RootState) => state.spotify;
export const selectWeather = (state: RootState) => state.weather;

export default store;
