import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: WeatherSliceState = {
  forecast: undefined,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setForecast: (
      state,
      action: PayloadAction<Weather.OneCallDataResponse>
    ) => {
      return { ...state, forecast: action.payload };
    },
  },
});

export const { setForecast } = weatherSlice.actions;
export default weatherSlice.reducer;
