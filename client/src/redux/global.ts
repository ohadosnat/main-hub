import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IStylesState = {
  pageTheme: "",
  containerHeight: "",
  isNight: true,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    /**
     * Sets the `global` page theme based on the current router `pathname` and `isNight`
     *
     * @param payload - includes the `payload` object `{ pathname: string, isNight: boolean }`
     * @returns an updated `pageTheme` value for the reducer's `state`.
     * @example
     *
     * const isNight = false; // this value will usually be from a state (like redux).
     * const { pathname } = useLocation();
     *
     * useEffect(() => {
     *    dispatch(setPageTheme({pathname, isNight}))
     * }, [pathname])
     */
    setPageTheme: (state, action: PayloadAction<BackgroundColorPayload>) => {
      const { isNight, pathname } = action.payload;
      if (pathname === "/weather") {
        return { ...state, pageTheme: !isNight ? "day" : "night" };
      }
      if (pathname === "/player") {
        return {
          ...state,
          pageTheme: "player",
        };
      }
      return { ...state, pageTheme: "" };
    },

    /**
     * Sets the `global`'s container height value based on the current router `pathname` and `locationByName`
     * @param payload - includes the `pathname` and `locationByName`
     * @example
     * const locationByName = "New York City"
     * const { pathname } = useLocation();
     *
     *  useEffect(() => {
     *    dispatch(setContainerHeight({ pathname, locationByName }));
     * }, [pathname])
     */
    setContainerHeight: (
      state,
      action: PayloadAction<ContainerHeightPayload>
    ) => {
      const { pathname, locationByName } = action.payload;
      const isHome = pathname === "/";
      const isSettings = pathname === "/settings";
      const isWeatherWithoutLocation =
        pathname === "/weather" && !locationByName;
      if (isHome || isWeatherWithoutLocation || isSettings) {
        return { ...state, containerHeight: "h-full" };
      }
      return { ...state, containerHeight: "h-full landscape:h-auto" };
    },

    /**
     * Toggles the `global` night value based on the `payload`'s value.
     *
     * @param payload - The current time (`HH:MM`) value.
     * @example toggleNight("13:00")
     */
    toggleNight: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const time = parseInt(payload.slice(0, 2));
      if (time >= 6 && time < 18) return { ...state, isNight: false };
      return { ...state, isNight: true };
    },
  },
});
export const { setPageTheme, setContainerHeight, toggleNight } =
  globalSlice.actions;
export default globalSlice.reducer;
