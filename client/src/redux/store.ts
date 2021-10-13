import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.user;

export default store;

/* 
player - spotify (ASYNC API) - if no access token found, prompt a login and fetch data. set an interval 
weather - api data (ASYNC API) - if no data found in local state, fetch.
user - user data (settings) (ASYNC FIRESTORE)

weather: {
    current: IWeather;
    hourly: IWeather[];
    daily: WeatherDaily[];
}

user: {
    uid
    theme
    name
    player: {
        spotifyRefreshToken: string | undifined
    }
    weather: {
        locationByName
        locationByCords
    }
}


*/
