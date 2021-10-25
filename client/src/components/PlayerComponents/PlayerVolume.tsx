import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSpotifyWebApi } from "../../context/spotifyWebApiContext";
import { selectSpotify } from "../../redux/store";
import { VolumeIcon } from "../Icons/Icons";

interface Props {
  modalOpen: (type: "device" | "volume") => void;
  volumeOpen: boolean;
  container: Variants;
}

const PlayerVolume = ({ modalOpen, container, volumeOpen }: Props) => {
  const { player } = useSelector(selectSpotify);
  const [volume, setVolumeState] = useState<string>("");
  const { setVolume } = useSpotifyWebApi();

  // Sets the Volume value
  const setVolumeHandle = (value: string): void => {
    setVolumeState(value);
    setVolume!(parseInt(volume));
  };

  // Sets the current device volume value
  useEffect(() => {
    if (!player?.device.volume_percent) return;
    const value = player.device.volume_percent!;
    setVolumeState(value.toString());
  }, [player?.device.volume_percent]);

  return (
    <div id="volume" className="relative w-8 ">
      <VolumeIcon
        onClick={() => modalOpen("volume")}
        className={`stroke-current hover:scale-110 transform global-transition ${
          volumeOpen && "text-indicator"
        }`}
      />
      <motion.div
        initial={false}
        animate={volumeOpen ? "open" : "closed"}
        variants={container}
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
          onMouseUp={() => setVolumeHandle(volume)}
        />
      </motion.div>
    </div>
  );
};

export default PlayerVolume;
