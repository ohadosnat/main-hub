export interface UserSliceState {
  uid: string;
  name: string;
  theme: "light" | "dark";
  weather: {
    locationByName: string | undefined;
    locatoinByCords: [number, number] | undefined;
  };
  player: {
    spotifyRefreshToken: string | undefined;
  };
}
