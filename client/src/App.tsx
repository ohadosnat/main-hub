import "./App.css";
import Overlay from "./components/Overlay/Overlay";
import Content from "./components/Content/Content";
import { useLocation } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/store";
import { useClock } from "./utils/useClock";
import { IStylesState } from "./types/stylesReducer";
import { stylesReducer } from "./utils/stylesReducer";

const initialState: IStylesState = {
  backgroundColor: "",
  containerHeight: "",
  isNight: false,
};

function App() {
  // Styles Reducer
  const [styles, dispatch] = useReducer(stylesReducer, initialState);

  // Hooks
  const location = useLocation();
  const clock = useClock();
  const { weather } = useSelector(selectUser);

  // useEffects
  useEffect(() => {
    dispatch({ type: "TOGGLE_NIGHT", payload: { time: clock } });
  }, [clock]);

  useEffect(() => {
    dispatch({
      type: "BG_COLOR",
      payload: { pathname: location.pathname, isNight: styles.isNight },
    });
  }, [location.pathname, styles.isNight]);

  useEffect(() => {
    dispatch({
      type: "CONTAINER_HEIGHT",
      payload: {
        pathname: location.pathname,
        locationByName: weather.locationByName,
      },
    });
  }, [location.pathname, weather.locationByName]);

  return (
    <div className="text-center h-screen xl:flex xl:justify-center xl:items-center font-rubik">
      <section
        className={`relative ${styles.backgroundColor} ${styles.containerHeight} xl:h-3/5 xl:w-4/5 xl:rounded-xl xl:overflow-hidden xl:shadow-2xl 2xl:w-3/5`}
      >
        <Overlay clock={clock} pathname={location.pathname} />
        <Content />
      </section>
    </div>
  );
}

export default App;
