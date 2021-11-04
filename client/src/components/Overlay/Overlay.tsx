// React Dom
import { Link } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";
import { selectSpotify, selectWeather } from "../../redux/store";
// Hooks & Utils
import { useIsNotMobile } from "../../utils/hooks/useMediaQuery";
import { kelvinToCelcius } from "../../utils/weather";
// Components
import MiniPlayer from "../MiniPlayer/MiniPlayer";
import { MenuIcon, NavigationIcon, MusicNoteIcon } from "../Icons/Icons";

interface Props {
  clock: string;
  pathname: string;
}

const Overlay = ({ clock, pathname }: Props) => {
  const isNotMobile = useIsNotMobile();
  const { player } = useSelector(selectSpotify);
  const { forecast } = useSelector(selectWeather);

  return (
    <header>
      <h3 className="text-2xl font-medium flex justify-start select-none absolute top-6 left-6 md:top-10 md:left-10 z-[99]">
        {forecast && `${kelvinToCelcius(forecast.current.temp)}°c`}
      </h3>
      <h3 className="text-2xl font-medium col-start-3 flex justify-end select-none absolute top-6 right-6 md:top-10 md:right-10 z-[99]">
        {clock}
      </h3>

      <Link
        to="/nav"
        className={`${
          pathname === "/nav" && "current"
        } w-10 hover:scale-110 transform global-transition absolute bottom-6 left-6 md:bottom-10 md:right-10 z-[99]`}
      >
        <NavigationIcon className="fill-current" />
      </Link>
      <Link
        to="/"
        className={`${
          pathname === "/" && "current"
        } mx-auto w-10 hover:scale-110 transform global-transition absolute bottom-6 inset-x-0 md:bottom-10 z-[99]`}
      >
        <MenuIcon className="fill-current stroke-current" />
      </Link>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-[99]">
        <Link to="/player" className={`${pathname === "/player" && "current"}`}>
          <MusicNoteIcon className="fill-current w-10 hover:scale-110 transform global-transition" />
        </Link>
        {player && isNotMobile && pathname !== "/player" && <MiniPlayer />}
      </div>
      {player && !isNotMobile && pathname !== "/player" && <MiniPlayer />}
    </header>
  );
};

export default Overlay;
