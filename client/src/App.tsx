import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import Content from "./components/Content/Content";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobal, selectUser } from "./redux/store";
import { useClock } from "./utils/useClock";
import {
  setBackgroundColor,
  setContainerHeight,
  toggleNight,
} from "./redux/global";

function App() {
  // Global States (Redux)
  const { weather } = useSelector(selectUser);
  const { isNight, backgroundColor, containerHeight } =
    useSelector(selectGlobal);

  // Hooks
  const location = useLocation();
  const clock = useClock();
  const dispatch = useDispatch();

  // useEffects
  useEffect(() => {
    dispatch(toggleNight(clock));
  }, [clock]);

  useEffect(() => {
    dispatch(setBackgroundColor({ pathname: location.pathname, isNight }));
  }, [location.pathname, isNight]);

  useEffect(() => {
    dispatch(
      setContainerHeight({
        pathname: location.pathname,
        locationByName: weather.locationByName,
      })
    );
  }, [location.pathname, weather.locationByName]);

  return (
    <div className={`${backgroundColor}`}>
      <div className="overflow-x-hidden text-center h-screen xl:flex xl:justify-center xl:items-center font-rubik bg-black bg-opacity-40">
        <section
          className={`relative ${backgroundColor} ${containerHeight} xl:h-[70%] xl:w-4/5 xl:rounded-xl xl:overflow-hidden xl:shadow-2xl 2xl:w-[70%]`}
        >
          <Overlay clock={clock} pathname={location.pathname} />
          <Content />
        </section>
      </div>
    </div>
  );
}

export default App;
