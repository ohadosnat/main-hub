import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import Content from "./views/Content/Content";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobal, selectUser } from "./redux/store";
import { useClock } from "./utils/hooks/useClock";
import { setPageTheme, setContainerHeight, toggleNight } from "./redux/global";
import { setTheme } from "./redux/user";

function App() {
  // Global States (Redux)
  const { weather, theme } = useSelector(selectUser);
  const { isNight, pageTheme, containerHeight } = useSelector(selectGlobal);

  // Hooks
  const { pathname } = useLocation();
  const clock = useClock();
  const dispatch = useDispatch();

  // useEffects
  useEffect(() => {
    dispatch(toggleNight(clock));
  }, [clock]);

  useEffect(() => {
    dispatch(setPageTheme({ pathname, isNight }));
  }, [pathname, isNight]);

  useEffect(() => {
    dispatch(
      setContainerHeight({
        pathname,
        locationByName: weather.locationByName,
      })
    );
  }, [pathname, weather.locationByName]);

  useEffect(() => {
    if (pathname === "player") return;
    dispatch(setTheme(theme));
  }, [pathname]);

  return (
    <div className={`${pathname !== "/player" && theme} ${pageTheme}`}>
      <div
        className={`global-transition overflow-x-hidden text-center h-screen font-rubik
        bg-skin
        xl:flex xl:justify-center xl:items-center`}
      >
        <section
          className={`${containerHeight} relative text-skin
          bg-main bg-gradient-to-bl from-skin-start via-skin-middle to-skin-end
          xl:h-[70%] xl:w-4/5 xl:rounded-xl xl:overflow-hidden xl:shadow-2xl 2xl:w-[70%]`}
        >
          <Overlay clock={clock} pathname={pathname} />
          <Content />
        </section>
      </div>
    </div>
  );
}

export default App;
