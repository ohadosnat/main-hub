export interface IStylesState {
  backgroundColor: string;
  containerHeight: string;
  isNight: boolean;
}

export type ActionType =
  | { type: "BG_COLOR"; payload: { pathname: string; isNight: boolean } }
  | {
      type: "CONTAINER_HEIGHT";
      payload: { pathname: string; locationByName: string | undefined };
    }
  | { type: "TOGGLE_NIGHT"; payload: { time: string } };
