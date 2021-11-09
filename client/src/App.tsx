// React, Router Dom, CSS
import "./App.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// Redux & Context
import { setTheme } from "./redux/user";
import { useDispatch, useSelector } from "react-redux";
import { useSpotifyWebApi } from "./context/spotifyWebApiContext";
import { selectGlobal, selectUser, selectWeather } from "./redux/store";
import { setPageTheme, setContainerHeight, toggleNight } from "./redux/global";
// CUstom Hooks
import useAuth from "./utils/hooks/useAuth";
import { useClock } from "./utils/hooks/useClock";
import { useWeather } from "./utils/hooks/useWeather";
import useSpotifyAuth from "./utils/hooks/useSpotifyAuth";
import { useSpotifyWebPlayback } from "./utils/hooks/useSpotifyWebPlayback";
// Utils
import { generateTimestamp, setForecastHandle } from "./utils/weather";
// Animation
import { AppVariants } from "./utils/animationVariants";
import { motion } from "framer-motion";
// Components
import LoadingAnimation from "./components/Loading/LoadingAnimation";
import Overlay from "./components/Overlay/Overlay";
import Content from "./views/Content/Content";

function App() {
  // Global States (Redux)
  const { forecast } = useSelector(selectWeather);
  const { weather, theme } = useSelector(selectUser);
  const { isNight, pageTheme, containerHeight, isLoading } =
    useSelector(selectGlobal);
  const dispatch = useDispatch();

  // Custom Hooks
  const { pathname } = useLocation();
  const clock = useClock();
  useAuth();
  useSpotifyAuth();
  useSpotifyWebPlayback();
  useSpotifyWebApi();
  useWeather();

  // Toggles Night Theme (Weather) after 19:00
  useEffect(() => {
    dispatch(toggleNight(clock));
  }, [clock]);

  // App's Page Theme Effect (weather, player, general)
  useEffect(() => {
    dispatch(setPageTheme({ pathname, isNight }));
  }, [pathname, isNight]);

  // App's Container Height Effect
  useEffect(() => {
    const { locationByName } = weather;
    dispatch(setContainerHeight({ pathname, locationByName }));
  }, [pathname, weather.locationByName]);

  // App's Theme Effect (dark/light)
  useEffect(() => {
    dispatch(setTheme(theme));
  }, [pathname, theme]);

  // Forecast Update Effect
  useEffect(() => {
    if (pathname !== "/weather" || !forecast) return;

    // Checks if the save is outdated (5 hours)
    const forecastSave = localStorage.getItem("save"); // Local Storage
    const data: Weather.WeatherLocalSave =
      forecastSave && JSON.parse(forecastSave);
    const currentTime = generateTimestamp();
    currentTime - data.time > 18000 &&
      setForecastHandle(forecast.lat, forecast.lon);
  }, [pathname]);

  return (
    <div className={`${pathname !== "/player" ? theme : ""} ${pageTheme}`}>
      <div
        className={`global-transition overflow-x-hidden text-center h-screen font-rubik bg-skin
        xl:flex xl:justify-center xl:items-center`}
      >
        {isLoading ? (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={AppVariants}
            className="fixed inset-0 flex justify-center items-center"
          >
            <LoadingAnimation />
          </motion.div>
        ) : (
          <motion.section
            initial="closed"
            animate="open"
            variants={AppVariants}
            className={`${containerHeight} relative text-skin
          bg-main bg-gradient-to-bl from-skin-start via-skin-middle to-skin-end
          xl:h-[70%] xl:w-4/5 xl:rounded-xl xl:overflow-hidden xl:shadow-2xl 2xl:w-[70%]`}
          >
            <Overlay clock={clock} pathname={pathname} />
            <Content />
          </motion.section>
        )}
      </div>
    </div>
  );
}

export default App;
