/* 
TODO:
[x] change divs to buttons
[x] current time
[] degrees
[x] mini play buttons (prev, next, play/pause)
  [] connect to the real player
[x] links to different pages
    [x] music
    [x] nav
    [x] home
[x] current page indicator
[] mini player state (open/closed)
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIsNotMobile } from "../../utils/hooks/useMediaQuery";
import { MenuIcon, NavigationIcon, MusicNoteIcon } from "../Icons/Icons";
import MiniPlayer from "../MiniPlayer/MiniPlayer";

interface Props {
  clock: string;
  pathname: string;
}

const Overlay = ({ clock, pathname }: Props) => {
  const isNotMobile = useIsNotMobile();

  return (
    <header>
      <h3 className="text-2xl font-medium flex justify-start select-none absolute top-6 left-6 md:top-10 md:left-10">
        30°c
      </h3>
      <h3 className="text-2xl font-medium col-start-3 flex justify-end select-none absolute top-6 right-6 md:top-10 md:right-10">
        {clock}
      </h3>

      <Link
        to="/nav"
        className={`${
          pathname === "/nav" && "current"
        } w-10 hover:scale-110 transform global-transition absolute bottom-6 left-6 md:bottom-10 md:right-10 z-[1]`}
      >
        <NavigationIcon className="fill-current" />
      </Link>
      <Link
        to="/"
        className={`${
          pathname === "/" && "current"
        } mx-auto w-10 hover:scale-110 transform global-transition absolute bottom-6 inset-x-0 md:bottom-10 z-[1]`}
      >
        <MenuIcon className="fill-current stroke-current" />
      </Link>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-[1]">
        <Link to="/player" className={`${pathname === "/player" && "current"}`}>
          <MusicNoteIcon className="fill-current w-10 hover:scale-110 transform global-transition" />
        </Link>
        {isNotMobile && <MiniPlayer />}
      </div>
      {!isNotMobile && <MiniPlayer />}
    </header>
  );
};

export default Overlay;
