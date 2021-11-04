// React
import { useEffect, useState } from "react";
// Redux & Context
import { useSelector } from "react-redux";
import { selectSpotify } from "../../redux/store";
import { useSpotifyWebApi } from "../../context/spotifyWebApiContext";
// Components & Animation
import { VolumeIcon } from "../Icons/Icons";
import { motion } from "framer-motion";
import { modalVariants } from "../../utils/animationVariants";

interface Props {
  modalOpen: Player.ModalOpen;
  volumeOpen: boolean;
}

const PlayerVolume = ({ modalOpen, volumeOpen }: Props) => {
  // States
  const [volume, setVolumeState] = useState<string>("");
  const { player } = useSelector(selectSpotify);

  // Handlers
  const { setVolume } = useSpotifyWebApi();

  // Sets the Volume value on Spotify Playback SDK
  const setVolumeHandle: Player.VolumeHandle = (value) => {
    setVolume(parseInt(value));
  };

  // Sets the current device volume value
  useEffect(() => {
    if (!player?.device.volume_percent) return;
    const value = player.device.volume_percent!;
    setVolumeState(value.toString());
  }, [player?.device.volume_percent]);

  return (
    <div id="volume" className="relative w-8 ">
      <button
        onClick={() => modalOpen("volume")}
        className={`w-full hover:scale-110 transform global-transition ${
          volumeOpen && "text-indicator"
        }`}
      >
        <VolumeIcon className="stroke-current" />
      </button>

      <motion.div
        initial="closed"
        animate={volumeOpen ? "open" : "closed"}
        variants={modalVariants}
        className="absolute left-0  mt-4 w-60 flex flex-col py-2 px-4 bg-black bg-opacity-70 rounded-md"
      >
        <input
          type="range"
          name="volume"
          id="volume"
          min="0"
          max="100"
          step="10"
          value={volume}
          onChange={(e) => setVolumeState(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && setVolumeHandle(volume)}
          onClick={() => setVolumeHandle(volume)}
        />
      </motion.div>
    </div>
  );
};

export default PlayerVolume;
