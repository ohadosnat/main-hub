import ForecastItem from "./ForecastItem";
import { useEffect, useRef } from "react";
import {
  useIsLarge,
  useIsMedium,
  useIsSmall,
} from "../../utils/hooks/useMediaQuery";
import { handleScrollClick } from "../../utils/scroll";
import { CircleArrowIcon } from "../Icons/Icons";
import { useScrollArrows } from "../../utils/hooks/useScrollArrows";
import { useSelector } from "react-redux";
import { selectWeather } from "../../redux/store";

interface Props {
  type: "hourly" | "daily";
}

const ForecastItemsWrapper = ({ type }: Props) => {
  const { forecast } = useSelector(selectWeather);

  const ref = useRef(null);

  const [arrowsDirection, setArrowsDirection] = useScrollArrows(ref.current);

  // Media Query Hooks
  const isSmall = useIsSmall();
  const isMedium = useIsMedium();
  const isLarge = useIsLarge();

  useEffect(() => {
    if (type === "daily") {
      if (isSmall || isMedium || isLarge)
        return setArrowsDirection({ left: false, right: false });
    }
    setArrowsDirection({ left: false, right: true }); // set to the initial state
  }, [isSmall, isMedium, isLarge]);

  return (
    <div className="mb-6">
      <h4 className="text-xl font-medium mb-3">
        Next {type === "hourly" ? "12 Hours" : "8 Days"}
      </h4>
      <div className="relative overflow-hidden flex items-center">
        {arrowsDirection.left && (
          <button
            aria-label={`${type} forecast slider left button`}
            onClick={() =>
              handleScrollClick(ref.current! as HTMLDivElement, -100, 350)
            }
            className={`global-transition lg:hover:bg-opacity-70 px-[1px] absolute h-[90%] md:h-3/6 rounded-xl bg-forecast-arrow bg-opacity-90 text-white left-1 w-7`}
          >
            <CircleArrowIcon className="fill-current pointer-event-none" />
          </button>
        )}
        {arrowsDirection.right && (
          <button
            aria-label={`${type} forecast slider right button`}
            onClick={() =>
              handleScrollClick(ref.current! as HTMLDivElement, 100, 350)
            }
            className={`global-transition lg:hover:bg-opacity-70 px-[1px] absolute h-[90%] md:h-3/6 rounded-xl bg-forecast-arrow bg-opacity-90 text-white right-1 w-7 transform rotate-180`}
          >
            <CircleArrowIcon className="fill-current pointer-event-none" />
          </button>
        )}
        <div
          className="select-none overflow-x-scroll pb-[20px] mb-[-20px] xl:gap-x-6"
          ref={ref}
        >
          <div className="flex w-max">
            {/* Forecast Item */}
            {type === "hourly"
              ? forecast?.hourly
                  .slice(0, 12)
                  .map((item) => (
                    <ForecastItem
                      key={item.dt}
                      data={{ type, payload: item }}
                    />
                  ))
              : forecast?.daily.map((item) => (
                  <ForecastItem key={item.dt} data={{ type, payload: item }} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastItemsWrapper;
