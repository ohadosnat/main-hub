import { PauseIcon, SkipBackIcon, SkipForwardIcon } from "../Icons/Icons";

const MiniPlayer = () => {
  return (
    <div className="absolute flex justify-evenly bg-white bg-opacity-20 py-2 w-2/5 h-9 rounded-full inset-x-0 mx-auto top-6 md:top-0 md:bottom-10 md:right-16 md:left-auto md:w-32 md:h-10 md:py-3 xl:py-[10px] xl:h-10 xl:w-36">
      <SkipBackIcon className="fill-current w-6 hover:scale-110 transform global-transition" />
      <PauseIcon className="fill-current w-6 hover:scale-110 transform global-transition" />
      <SkipForwardIcon className="fill-current w-6 hover:scale-110 transform global-transition" />
    </div>
  );
};

export default MiniPlayer;
