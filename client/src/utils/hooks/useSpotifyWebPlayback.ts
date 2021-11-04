import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsReady, clearPlayerState } from "../../redux/spotify";
import { selectUser } from "../../redux/store";

/**
 * Initialize a Spotify WebPlayback SDK Client to steam audio on.
 */
export const useSpotifyWebPlayback = () => {
  const [player, setPlayer] = useState<SpotifySDK.Player | undefined>(
    undefined
  );

  const { spotify, uid } = useSelector(selectUser);
  const dispatch = useDispatch();

  // Init Client
  useEffect(() => {
    if (!spotify.access_token || player) return;
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const player: SpotifySDK.Player = new window.Spotify.Player({
        name: "Main Hub",
        getOAuthToken: (cb: any) => {
          cb(spotify.access_token);
        },
        volume: 0.5,
      });

      setPlayer(player);
    };
  }, [spotify.access_token]);

  // Connect Client
  useEffect(() => {
    if (!player) return;
    player
      .connect()
      .then((success: boolean) => {
        if (success) {
          dispatch(setIsReady(success));
        }
      })
      .catch((err) => console.error(err));
  }, [player]);

  useEffect(() => {
    if ((player && !uid) || !spotify.isLogged) {
      player?.disconnect();
      dispatch(clearPlayerState());
    }
  }, [uid, spotify.isLogged]);
};
