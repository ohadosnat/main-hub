import React, { useEffect, useState } from "react";
import { IWeather, WeatherDaily } from "../../types/weather";
import { calcAvgTemp, getHours } from "../../utils/weather";

interface Props {
  type: "hourly" | "daily";
  data: IWeather | WeatherDaily;
}

function ForecastItem({ data, type }: Props) {
  const [tempValue, setTempValue] = useState<number>(0);
  const [timeValue, setTimeValue] = useState<number>(0);

  useEffect(() => {
    setTimeValue(getHours(data.dt));
    if (type === "daily") {
      const { min, max } = (data as WeatherDaily).temp;
      return setTempValue(calcAvgTemp(min, max));
    }
    setTempValue((data as IWeather).temp);
  }, []);

  return (
    <div
      key={data.dt}
      className="mr-4 flex flex-col justify-center items-center lg:text-lg 2xl:mr-6"
    >
      <p className="">{timeValue}:00</p>
      <img
        src={`/assets/icons/weather/${data.weather[0].icon}.svg`}
        alt={`${data.weather[0].description}`}
        className="h-12 w-12 fill-current"
      />
      <p className="lg:text-lg">{tempValue}&deg;c</p>
    </div>
  );
}

export default ForecastItem;
