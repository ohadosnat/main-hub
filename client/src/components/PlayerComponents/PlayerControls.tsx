import {
  ListIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "../Icons/Icons";
import { useCycle } from "framer-motion";
import { useSpotifyWebApi } from "../../context/spotifyWebApiContext";
import { useSelector } from "react-redux";
import { selectSpotify } from "../../redux/store";
import DeviceList from "./DeviceList";
import PlayerVolume from "./PlayerVolume";

// Animation Variants
const container = {
  closed: { y: -5, opacity: 0, transitionEnd: { display: "none" } },
  open: { y: 0, opacity: 1, display: "flex" },
};

const PlayerControls = () => {
  // Global States (Context & Redux)
  const { togglePlayer, skipBack, skipForward, toggleShuffle, toggleRepeat } =
    useSpotifyWebApi(); // context
  const { player } = useSelector(selectSpotify); // redux

  // Animation Device List Modal
  const [deviceListOpen, toggleListOpen] = useCycle(false, true);
  const [volumeOpen, toggleVolumeOpen] = useCycle(false, true);

  // Handles Modal open states - making sure only one if true.
  const modalOpen = (type: "device" | "volume"): void => {
    if (type === "device") {
      toggleListOpen();
      volumeOpen && toggleVolumeOpen();
    }
    if (type === "volume") {
      toggleVolumeOpen();
      deviceListOpen && toggleListOpen();
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-full md:w-4/5 mt-4">
      <div className="w-full flex justify-between items-center">
        <div
          id="repeatSongs"
          className={`relative w-8 hover:scale-110 transform global-transition ${
            player?.repeat_state !== "off" && "text-indicator"
          }`}
          onClick={() => toggleRepeat!(player?.repeat_state!)}
        >
          {player?.repeat_state === "track" && (
            <div className="w-3 h-3 rounded-full bg-player-secondary text-player-main absolute top-0 right-0"></div>
          )}
          <RepeatIcon className="fill-current" />
        </div>
        <div
          id="previousSong"
          className="w-8 hover:scale-110 transform global-transition"
          onClick={() => skipBack!()}
        >
          <SkipBackIcon className="fill-current" />
        </div>
        <div
          id="playControl"
          className="text-player-secondary bg-player-main w-16 h-16 rounded-full flex justify-center items-center hover:scale-110 transform global-transition"
        >
          {player?.is_playing ? (
            <PauseIcon
              className="fill-current w-7"
              onClick={() => togglePlayer!("pause")}
            />
          ) : (
            <PlayIcon
              className="fill-current w-7"
              onClick={() => togglePlayer!("play")}
            />
          )}
        </div>
        <div
          id="nextSong"
          className="w-8 hover:scale-110 transform global-transition"
          onClick={() => skipForward!()}
        >
          <SkipForwardIcon className="fill-current" />
        </div>
        <div
          id="shuffleSongs"
          className={`w-8 hover:scale-110 transform global-transition ${
            player?.shuffle_state && "text-indicator"
          }`}
          onClick={() => toggleShuffle!(!player?.shuffle_state!)}
        >
          <ShuffleIcon className="fill-current" />
        </div>
      </div>
      <div className="flex justify-between items-center w-full md:w-4/5 mt-6">
        <PlayerVolume
          container={container}
          volumeOpen={volumeOpen}
          modalOpen={modalOpen}
        />
        <div
          id="playlist"
          className="w-8 hover:scale-110 transform global-transition"
        >
          <ListIcon className="stroke-current" />
        </div>
        <DeviceList
          modalOpen={modalOpen}
          deviceListOpen={deviceListOpen}
          container={container}
          toggleListOpen={toggleListOpen}
        />
      </div>
    </div>
  );
};

export default PlayerControls;
