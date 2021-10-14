export interface IStylesState {
  backgroundColor: string;
  containerHeight: string;
  isNight: boolean;
}

export type BackgroundColorPayload = { pathname: string; isNight: boolean };
export type ContainerHeightPayload = {
  pathname: string;
  locationByName: string | undefined;
};
