import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import globalReducer from "./global";
import spotifyReducer from "./spotify";

const store = configureStore({
  reducer: {
    user: userReducer,
    global: globalReducer,
    spotify: spotifyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.user;
export const selectGlobal = (state: RootState) => state.global;
export const selectSpotify = (state: RootState) => state.spotify;

export default store;
