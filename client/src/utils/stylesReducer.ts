// For App.tsx useReducer

import { ActionType, IStylesState } from "../types/stylesReducer";
export const stylesReducer = (
  state: IStylesState,
  action: ActionType
): IStylesState => {
  switch (action.type) {
    case "BG_COLOR": {
      const { payload } = action;
      // checks for pathname -> then if it's night (might change it the otherway when i'll have more pages)
      if (payload.pathname === "/weather") {
        const backgroundColor = payload.isNight
          ? "bg-gradient-to-bl from-[#1D2570] via-[#462D98] to-[#7635C8] text-white"
          : "bg-gradient-to-bl from-[#FF9B63] via-[#FFCE84] to-[#FFE8AB] text-black";
        return { ...state, backgroundColor };
      }
      return { ...state, backgroundColor: "bg-[#12092A] text-white" };
    }
    case "CONTAINER_HEIGHT": {
      const { payload } = action;
      const isHome = payload.pathname === "/";
      const isWeatherWithoutLocation =
        payload.pathname === "/weather" && !payload.locationByName;
      if (isHome || isWeatherWithoutLocation) {
        return { ...state, containerHeight: "h-full" };
      }
      return { ...state, containerHeight: "h-full landscape:h-auto" };
    }
    case "TOGGLE_NIGHT": {
      const { payload } = action;
      if (payload.time < "19:00") return { ...state, isNight: false };
      return { ...state, isNight: true };
    }
    default:
      return state;
  }
};
