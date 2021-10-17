import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { PauseIcon, SkipBackIcon, SkipForwardIcon } from "../Icons/Icons";

const MiniPlayer = () => {
  const [textColor, setTextColor] = useState("text-skin");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/weather") return setTextColor("text-black");
    return setTextColor("text-skin");
  }, [pathname]);

  return (
    <div
      className={`${textColor} bg-box absolute flex justify-evenly py-2 w-2/5 h-9 rounded-full inset-x-0 mx-auto top-6
      md:top-0 md:bottom-10 md:right-16 md:left-auto md:w-32 md:h-10 md:py-3
      xl:py-[10px] xl:h-10 xl:w-36`}
    >
      <SkipBackIcon className="fill-current w-6 hover:scale-110 transform global-transition" />
      <PauseIcon className="fill-current w-6 hover:scale-110 transform global-transition" />
      <SkipForwardIcon className="fill-current w-6 hover:scale-110 transform global-transition" />
    </div>
  );
};

export default MiniPlayer;
