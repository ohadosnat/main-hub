import {
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
import PlayerMenu from "./PlayerMenu/PlayerMenu";

const PlayerControls = () => {
  // Global States (Context & Redux)
  const {
    skipBack,
    skipForward,
    toggleRepeat,
    toggleShuffle,
    togglePlayerState,
  } = useSpotifyWebApi();
  const { player } = useSelector(selectSpotify);

  // Modal visibility states
  const [volumeOpen, toggleVolumeOpen] = useCycle(false, true);
  const [deviceListOpen, toggleListOpen] = useCycle(false, true);
  const [menuOpen, toggleMenuOpen] = useCycle(false, true);

  // Handles Modal open states - making sure to display only one.
  const modalOpen: Player.ModalOpen = (type) => {
    switch (type) {
      case "device":
        toggleListOpen();
        volumeOpen && toggleVolumeOpen();
        break;
      case "volume":
        toggleVolumeOpen();
        deviceListOpen && toggleListOpen();
        break;
      case "menu":
        toggleMenuOpen();
        volumeOpen && toggleVolumeOpen();
        deviceListOpen && toggleListOpen();
        break;
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col justify-between items-center w-full md:w-4/5 mt-4">
      {/* First Row Controls */}
      <div
        className={`w-full flex items-center ${
          player?.type === "track" ? "justify-between" : "justify-center mb-2"
        }`}
      >
        {player?.type === "track" && (
          <>
            {/* Repeat */}
            <button
              id="toggleRepeat"
              onClick={() => toggleRepeat(player?.repeat_state!)}
              className={`relative w-8 hover:scale-110 transform global-transition ${
                player?.repeat_state !== "off" ? "text-indicator" : ""
              }`}
            >
              {player?.repeat_state === "track" && (
                <span className="w-3 h-3 rounded-full bg-player-secondary text-player-main absolute top-0 right-0"></span>
              )}
              <RepeatIcon className="fill-current" />
            </button>
            {/* Previous Track */}
            <button
              id="skipBack"
              onClick={() => skipBack()}
              className="w-8 hover:scale-110 transform global-transition"
            >
              <SkipBackIcon className="fill-current" />
            </button>
          </>
        )}
        {/* Toggle Play/Pause */}
        <button
          id="togglePlayState"
          className="text-player-secondary bg-player-main w-16 h-16 rounded-full flex justify-center items-center hover:scale-110 transform global-transition"
          onClick={() =>
            togglePlayerState(player?.is_playing ? "pause" : "play")
          }
        >
          {player?.is_playing ? (
            <PauseIcon className="fill-current w-7" />
          ) : (
            <PlayIcon className="fill-current w-7" />
          )}
        </button>
        {player?.type === "track" && (
          <>
            {/* Skip Forward */}
            <button
              id="skipForward"
              onClick={() => skipForward()}
              className="w-8 hover:scale-110 transform global-transition"
            >
              <SkipForwardIcon className="fill-current" />
            </button>
            {/* Toggle Shuffle */}
            <button
              id="toggleShuffle"
              onClick={() => toggleShuffle(!player?.shuffle_state!)}
              className={`w-8 hover:scale-110 transform global-transition ${
                player?.shuffle_state ? "text-indicator" : ""
              }`}
            >
              <ShuffleIcon className="fill-current" />
            </button>
          </>
        )}
      </div>
      {/* Second Row Controls */}
      <div className="flex justify-between items-center w-full md:w-4/5 mt-6">
        <PlayerVolume volumeOpen={volumeOpen} modalOpen={modalOpen} />
        <PlayerMenu
          modalOpen={modalOpen}
          menuOpen={menuOpen}
          toggleMenuOpen={toggleMenuOpen}
        />
        <DeviceList
          modalOpen={modalOpen}
          deviceListOpen={deviceListOpen}
          toggleListOpen={toggleListOpen}
        />
      </div>
    </div>
  );
};

export default PlayerControls;
