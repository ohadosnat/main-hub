import { dummyWeather } from "../../mocks/weather-data-mocks";
import ForecastItem from "./ForecastItem";
import React, { useEffect, useRef, useState } from "react";
import { useIsLarge, useIsSmall } from "../../utils/hooks/useMediaQuery";
import { handleScrollClick } from "../../utils/scroll";
import { CircleArrowIcon } from "../Icons/Icons";

interface Props {
  type: "hourly" | "daily";
}

interface IArrowDirection {
  left: boolean;
  right: boolean;
}

const initialArrows: IArrowDirection = { left: false, right: true };

const ForecastItemsWrapper = ({ type }: Props) => {
  const { hourly, daily } = dummyWeather; // TODO: Should be from global state
  const [arrowDirection, setArrowDirection] =
    useState<IArrowDirection>(initialArrows);
  const ref = useRef(null);

  const isSmall = useIsSmall(); // small and up
  const isLarge = useIsLarge();

  useEffect(() => {
    if (type === "daily") {
      if (isLarge) return setArrowDirection({ left: false, right: true });
      if (isSmall) return setArrowDirection({ left: false, right: false });
    }
    setArrowDirection({ left: false, right: true }); // set to the initial state
  }, [isSmall, isLarge]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    // Getting the scroll position
    const { scrollLeft, clientWidth, scrollWidth } = e.currentTarget;
    const position = scrollWidth - scrollLeft - clientWidth;
    const startPosition = scrollWidth - clientWidth;

    // Setting the arrow
    if (position <= 10) return setArrowDirection({ left: true, right: false });
    if (position > 10 && position < startPosition)
      return setArrowDirection({ left: true, right: true });
    if (position === startPosition)
      return setArrowDirection({ left: false, right: true });
  };

  return (
    <div className="mb-6">
      <h4 className="text-xl font-medium mb-3">
        Next {type === "hourly" ? "12 Hours" : "8 Days"}
      </h4>
      <div className="relative overflow-hidden flex items-center">
        {arrowDirection.left && (
          <button
            aria-label={`${type} forecast slider left button`}
            onClick={() =>
              handleScrollClick(ref.current! as HTMLDivElement, -100, 350)
            }
            className="opacity-50 absolute left-1 w-7 h-7"
          >
            <CircleArrowIcon className="fill-current pointer-event-none" />
          </button>
        )}
        {arrowDirection.right && (
          <button
            aria-label={`${type} forecast slider right button`}
            onClick={() =>
              handleScrollClick(ref.current! as HTMLDivElement, 100, 350)
            }
            className="opacity-50 absolute right-1 w-7 h-7 transform rotate-180"
          >
            <CircleArrowIcon className="fill-current pointer-event-none" />
          </button>
        )}
        <div
          className="select-none overflow-x-scroll pb-[20px] mb-[-20px] xl:gap-x-6"
          onScroll={handleScroll}
          ref={ref}
        >
          <div className="flex w-max">
            {/* Forecast Item */}
            {type === "hourly"
              ? hourly
                  .slice(0, 12)
                  .map((item) => (
                    <ForecastItem key={item.dt} data={item} type={type} />
                  ))
              : daily.map((item) => (
                  <ForecastItem key={item.dt} data={item} type={type} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastItemsWrapper;
