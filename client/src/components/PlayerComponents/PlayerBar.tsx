import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpotifyWebApi } from "../../context/spotifyWebApiContext";
import { setProgress } from "../../redux/spotify";
import { selectSpotify } from "../../redux/store";
import { calcProgress, calcMstoMin } from "../../utils/player";

const PlayerBar = () => {
  // Global State (Context & Redux)
  const { player, currentProgress } = useSelector(selectSpotify);
  const { setPosition } = useSpotifyWebApi();
  const dispatch = useDispatch();

  if (!player) return <div></div>; // player safe guard - temp.

  const setSeekPosition: Player.SeekPosition = (e) => {
    const { clientWidth } = e.currentTarget;
    const duration = player.item.duration_ms;
    const seekPosition = (e.nativeEvent.offsetX / clientWidth) * duration!;
    setPosition(seekPosition, player.device.id!);
  };

  // Sets the current progress in a song.
  useEffect(() => {
    dispatch(
      setProgress(calcProgress(player.progress_ms!, player.item.duration_ms!))
    );
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
          style={{ left: `${currentProgress}%` }}
        ></div>
        <div
          id="progressBar"
          className="rounded-l-full absolute left-0 z-0 h-full global-transition bg-indicator"
          style={{ width: `${currentProgress}%` }}
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
