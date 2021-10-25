import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IGlobalState = {
  pageTheme: "",
  containerHeight: "",
  isNight: true,
  message: "",
  isLoading: false,
  showModal: true,
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
    /**
     * Sets the global `message` value
     * @param action - sets the message for the user.
     * @returns the state with the updated value of `message`
     */
    setMessage: (state, action: PayloadAction<string>) => {
      return { ...state, message: action.payload };
    },
    /**
     * Sets the global `isLoading` value
     * @param action - a `boolean`
     * @returns the state with the updated value of `isLoading`
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
    /**
     * Sets the global `showModal` value
     * @param action - a `boolean`, to decide if the modal show be displayed to the user
     * @returns the state with the updated value of `showModal`
     */
    setShowModal: (state, action: PayloadAction<boolean>) => {
      return { ...state, showModal: action.payload };
    },
  },
});
export const {
  setPageTheme,
  setContainerHeight,
  toggleNight,
  setMessage,
  setLoading,
  setShowModal,
} = globalSlice.actions;
export default globalSlice.reducer;
