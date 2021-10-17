/* ---User--- */

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
    isLogged: boolean;
  };
}

/* ---Global--- */

interface IStylesState {
  pageTheme: string;
  containerHeight: string;
  isNight: boolean;
}

type BackgroundColorPayload = { pathname: string; isNight: boolean };
type ContainerHeightPayload = {
  pathname: string;
  locationByName: string | undefined;
};
