import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSpotifyWebApi } from "../../context/spotifyWebApiContext";
import { selectSpotify } from "../../redux/store";
import { calcProgress, calcMstoMin } from "../../utils/player";

const PlayerBar = () => {
  // Local State
  const [progress, setProgress] = useState<number>(0);

  // Global State (Context & Redux)
  const { player } = useSelector(selectSpotify);
  const { setPosition } = useSpotifyWebApi();

  if (!player) return <div></div>; // player safe guard - temp.

  // Sets the current position in a song.
  const setSeekPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientWidth } = e.currentTarget;
    const duration = player.item.duration_ms;
    const seekPosition = (e.nativeEvent.offsetX / clientWidth) * duration!;
    setPosition!(seekPosition);
  };

  // Sets the current progress in a song.
  useEffect(() => {
    setProgress(calcProgress(player.progress_ms!, player.item.duration_ms!));
  }, [player.progress_ms]);

  return (
    <div className="w-full flex flex-wrap justify-between">
      <div
        id="progressBarContainer"
        className="w-full relative h-2 flex items-center rounded-full mb-3 "
        onClick={(e) => setSeekPosition(e)}
      >
        <div
          id="progressBarCircle"
          className="z-[2] rounded-full absolute w-4 h-4 -ml-2 hover:scale-110 transform global-transition bg-indicator"
          style={{ left: `${progress}%` }}
        ></div>
        <div
          id="progressBar"
          className="rounded-l-full absolute left-0 z-0 h-full global-transition bg-indicator"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="rounded-full bg-white w-full h-full"></div>
      </div>
      <p id="currentTime" className="text-xl select-none">
        {calcMstoMin(player.progress_ms!)}
      </p>
      <p id="durationTime" className="text-xl select-none">
        {calcMstoMin(player.item.duration_ms!)}
      </p>
    </div>
  );
};

export default PlayerBar;
