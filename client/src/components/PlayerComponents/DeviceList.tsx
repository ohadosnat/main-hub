import { motion, Variants } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpotifyWebApi } from "../../context/spotifyWebApiContext";
import { setDeviceList } from "../../redux/spotify";
import { selectSpotify } from "../../redux/store";
import { DeviceIcon, MusicNoteIcon } from "../Icons/Icons";

interface Props {
  modalOpen: (type: "device" | "volume") => void;
  deviceListOpen: boolean;
  container: Variants;
  toggleListOpen: (i?: number | undefined) => void;
}

const DeviceList = ({
  modalOpen,
  deviceListOpen,
  container,
  toggleListOpen,
}: Props) => {
  // Global States
  const { isReady, deviceList } = useSelector(selectSpotify); // redux
  const { selectDevice, getMyDevices } = useSpotifyWebApi(); // context
  const dispatch = useDispatch();

  // Select Device Handle - switch device & close the modal.
  const selectDeviceHandle = (id: string): void => {
    selectDevice!(id);
    toggleListOpen();
  };

  //  Get the user's active devices
  useEffect(() => {
    if (!isReady) return;

    // get initial device list, when the device list is empty.
    if (deviceList.length === 0) {
      const timer = setTimeout(() => {
        getMyDevices!().then(
          (devices) => devices && dispatch(setDeviceList(devices))
        );
      }, 1000);
      return () => clearTimeout(timer);
    }

    // get the current device list every 2secs
    const interval = setInterval(() => {
      getMyDevices!().then(
        (devices) => devices && dispatch(setDeviceList(devices))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isReady, deviceList]);

  return (
    <div id="deviceList" className="relative w-8">
      <DeviceIcon
        onClick={() => modalOpen("device")}
        className={`stroke-current hover:scale-110 transform global-transition ${
          deviceListOpen && "text-indicator"
        }`}
      />
      <motion.div
        initial={false}
        animate={deviceListOpen ? "open" : "closed"}
        variants={container}
        className="absolute right-0 md:left-0 md:right-auto mt-4 w-60 flex flex-col py-2 px-4 bg-black bg-opacity-70 rounded-md space-y-2"
      >
        {deviceList.length === 0 ? (
          <p>No Devices Found</p>
        ) : (
          deviceList.map((device) => (
            <button
              onClick={() => selectDeviceHandle(device.id!)}
              key={device.id}
              className={`flex justify-between items-center text-left ${
                device.is_active && "text-indicator"
              }`}
            >
              <p className="flex-grow">{device.name}</p>
              <MusicNoteIcon className="flex-none w-6 fill-current" />
            </button>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default DeviceList;
