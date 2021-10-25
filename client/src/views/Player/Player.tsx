import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlayerBar from "../../components/PlayerComponents/PlayerBar";
import PlayerControls from "../../components/PlayerComponents/PlayerControls";
import { selectSpotify, selectUser } from "../../redux/store";
import { setCSSVariable } from "../../utils/colors";
import { useGenerateColors } from "../../utils/hooks/useGenerateColors";
import PlayerEmptyState from "./PlayerEmptyState";

const Player = () => {
  const {
    spotify: { isLogged },
  } = useSelector(selectUser);

  const { player } = useSelector(selectSpotify);

  const [trackImage, setTrackImage] = useState<string>(
    "/assets/playerPlaceholder.jpg"
  );
  useGenerateColors(trackImage);

  useEffect(() => {
    const images = player?.item.album?.images;
    if (images) return setTrackImage(images[0].url);
  }, [player]);

  useEffect(() => {
    setCSSVariable("--bg-artwork", `url(${trackImage})`);
  }, [trackImage]);

  if (!isLogged || !player) return <PlayerEmptyState />;

  return (
    <>
      <div
        className={`global-transition text-white bg-artwork bg-center bg-no-repeat bg-cover absolute inset-0 flex justify-center items-center px-8 md:p-10`}
      >
        <div className="absolute bg-black inset-0 opacity-70 z-0" />
        <div className="w-full h-full flex flex-col justify-center items-center md:w-3/5 mx-auto z-[1]">
          <div
            id="songInfo"
            className="text-player-main text-center select-none"
          >
            <h1 className="text-4xl font-medium tracking-wide mb-2">
              {player ? player.item.name : "No song is currently playing"}
            </h1>
            <h4 className="text-2xl tracking-wide mb-4">
              {player.item.artists && player.item.artists[0].name}
            </h4>
          </div>
          <PlayerBar />
          <PlayerControls />
        </div>
      </div>
    </>
  );
};

export default Player;
