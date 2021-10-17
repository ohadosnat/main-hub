import { useEffect, useState } from "react";
import {
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "../../components/Icons/Icons";
import { setCSSVariable } from "../../utils/colors";
import { useGenerateColors } from "../../utils/hooks/useGenerateColors";

const dummyImg =
  "https://i.scdn.co/image/ab67616d0000b2736582b0de8c4acde5f02f4f51";

const Player = () => {
  const [trackImage, setTrackImage] = useState<string>("");
  useGenerateColors(trackImage);

  useEffect(() => {
    setTimeout(() => {
      setTrackImage(dummyImg);
    }, 1);
  }, [dummyImg]);

  useEffect(() => {
    setCSSVariable("--bg-artwork", `url(${trackImage})`);
  }, [trackImage]);
  return (
    <>
      <div
        className={`global-transition text-white bg-artwork bg-center bg-no-repeat bg-cover absolute inset-0 flex justify-center items-center px-8 md:p-10`}
      >
        <div className="absolute bg-black inset-0 opacity-70 z-0" />
        {/* <p>🎶 music player 🎶</p> */}
        <div className="w-full h-full flex flex-col justify-center items-center md:w-3/5 mx-auto z-[1]">
          <div
            id="songInfo"
            className="text-player-main text-center select-none"
          >
            <h1 className="text-4xl font-medium tracking-wide mb-2">
              Baby Boy
            </h1>
            <h4 className="text-2xl tracking-wide mb-4">Childish Gambino</h4>
          </div>
          {/* <!--Player Bar--> */}
          <div className="w-full flex flex-wrap justify-between">
            <div
              id="progressBarContainer"
              className="w-full relative h-2 flex items-center rounded-full mb-3"
            >
              <div
                id="progressBarCircle"
                className="z-[2] rounded-full absolute w-4 h-4 -ml-2 hover:scale-110 transform global-transition"
              ></div>
              <div
                id="progressBar"
                className="rounded-l-full absolute left-0 z-0 h-full global-transition"
              ></div>
              <div className="rounded-full bg-white w-full h-full"></div>
            </div>
            <p id="currentTime" className="text-xl select-none">
              2:50
            </p>
            <p id="durationTime" className="text-xl select-none">
              4:55
            </p>
          </div>
          {/* Controls Start */}
          <div className="flex justify-between items-center w-full md:w-4/5 mt-4">
            <div
              id="repeatSongs"
              className="w-8 hover:scale-110 transform global-transition"
            >
              <RepeatIcon className="fill-current" />
            </div>
            <div
              id="previousSong"
              className="w-8 hover:scale-110 transform global-transition"
            >
              <SkipBackIcon className="fill-current" />
            </div>
            <div
              id="playControl"
              className="text-player-secondary bg-player-main w-16 h-16 rounded-full flex justify-center items-center hover:scale-110 transform global-transition"
            >
              <PlayIcon className="fill-current w-7" />
              <PauseIcon className="fill-current w-7" />
            </div>
            <div
              id="nextSong"
              className="w-8 hover:scale-110 transform global-transition"
            >
              <SkipForwardIcon className="fill-current" />
            </div>
            <div
              id="shuffleSongs"
              className="w-8 hover:scale-110 transform global-transition"
            >
              <ShuffleIcon className="fill-current" />
            </div>
          </div>
          {/* Controls End */}
        </div>
      </div>
    </>
  );
};

export default Player;
