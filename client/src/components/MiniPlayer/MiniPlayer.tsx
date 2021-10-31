import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useSpotifyWebApi } from "../../context/spotifyWebApiContext";
import { selectSpotify } from "../../redux/store";
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "../Icons/Icons";

const MiniPlayer = () => {
  // Local & Global State
  const [textColor, setTextColor] = useState("text-skin");
  const { player } = useSelector(selectSpotify);

  // Custom Hooks
  const { skipForward, skipBack, togglePlayerState } = useSpotifyWebApi();
  const { pathname } = useLocation();

  // Sets the correct text color
  useEffect(() => {
    if (pathname === "/weather") setTextColor("text-black");
    else setTextColor("text-skin");
  }, [pathname]);

  return (
    <div
      className={`${textColor} bg-box absolute flex justify-evenly py-2 w-2/5 h-9 rounded-full inset-x-0 mx-auto top-6
      md:top-0 md:bottom-10 md:right-16 md:left-auto md:w-32 md:h-10 md:py-3
      xl:py-[10px] xl:h-10 xl:w-36`}
    >
      <button
        className="w-6 hover:scale-110 transform global-transition hover:text-indicator"
        onClick={() => skipBack()}
      >
        <SkipBackIcon className="fill-current h-full w-full" />
      </button>
      <button className="w-6 hover:scale-110 transform global-transition hover:text-indicator">
        {player?.is_playing ? (
          <PauseIcon
            className="fill-current h-full w-full"
            onClick={() => togglePlayerState("pause")}
          />
        ) : (
          <PlayIcon
            className="fill-current h-full w-full"
            onClick={() => togglePlayerState("play")}
          />
        )}
      </button>
      <button
        className="w-6 hover:scale-110 transform global-transition hover:text-indicator"
        onClick={() => skipForward()}
      >
        <SkipForwardIcon className="fill-current h-full w-full" />
      </button>
    </div>
  );
};

export default MiniPlayer;
