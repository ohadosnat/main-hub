import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlayerBar from "../../components/PlayerComponents/PlayerBar";
import PlayerControls from "../../components/PlayerComponents/PlayerControls";
import { selectSpotify, selectUser } from "../../redux/store";
import { setCSSVariable } from "../../utils/colors";
import { useGenerateColors } from "../../utils/hooks/useGenerateColors";
import { calcMstoMin } from "../../utils/player";
import PlayerEmptyState from "./PlayerEmptyState";

const Player = () => {
  // Local & Global States
  const { spotify } = useSelector(selectUser);
  const { player } = useSelector(selectSpotify);
  const [trackImage, setTrackImage] = useState<string>(
    player?.type === "track"
      ? player.item.album!.images[0].url
      : "/assets/playerPlaceholder.jpg"
  );

  // Custom Hook
  useGenerateColors(trackImage);

  useEffect(() => {
    /* if it's not a track, OR if the track image is undefined, OR the image is the same (same album) */
    if (player?.type !== "track" || !player?.item.album?.images)
      return setTrackImage("/assets/playerPlaceholder.jpg");

    const image = player.item.album.images[0].url;
    image !== trackImage && setTrackImage(image);
  }, [player?.item.album?.images[0].url]);

  useEffect(() => {
    setCSSVariable("--bg-artwork", `url(${trackImage})`);
  }, [trackImage]);

  if (!spotify.isLogged || !player) return <PlayerEmptyState />;

  return (
    <>
      <div
        className={`global-transition text-white bg-artwork bg-center bg-no-repeat bg-cover absolute inset-0 flex justify-center items-center px-8 md:p-10`}
      >
        <div className="absolute bg-black inset-0 opacity-70 z-0" />
        <div className="w-full h-full flex flex-col justify-center items-center md:w-3/5 mx-auto z-[1]">
          <div
            id="songInfo"
            className="text-player-main text-center select-none w-full"
          >
            {player.type === "track" ? (
              <>
                <h1 className="text-4xl font-medium tracking-wide mb-2">
                  {player ? player.item.name : "No song is currently playing"}
                </h1>
                <h4 className="text-2xl tracking-wide mb-4">
                  {player.item.artists && player.item.artists[0].name}
                </h4>
                <PlayerBar />
              </>
            ) : (
              <>
                <h1 className="capitalize text-2xl mb-2">
                  Playing an {player.type} from Spotify
                </h1>
                <h4 className="text-4xl font-medium text-white mb-4">
                  {player.progress_ms && calcMstoMin(player.progress_ms)}
                </h4>
              </>
            )}
          </div>
          <PlayerControls />
        </div>
      </div>
    </>
  );
};

export default Player;
