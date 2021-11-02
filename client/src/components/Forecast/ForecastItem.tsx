import { useEffect, useState } from "react";
import {
  calcAvgTemp,
  getDate,
  getHours,
  kelvinToCelcius,
} from "../../utils/weather";

interface Props {
  data: Weather.HourlyForecastItem | Weather.DailyForecastItem;
}

function ForecastItem({ data }: Props) {
  const [tempValue, setTempValue] = useState<number>(0);
  const [timeValue, setTimeValue] = useState<number | string>(0);

  useEffect(() => {
    if (data.type === "daily") {
      setTimeValue(getDate(data.payload.dt));
      const { min, max } = data.payload.temp;
      const avg = calcAvgTemp(min, max);
      return setTempValue(kelvinToCelcius(avg));
    } else {
      setTimeValue(getHours(data.payload.dt));
    }
    setTempValue(kelvinToCelcius(data.payload.temp));
  }, [data]);

  return (
    <div
      key={data.payload.dt}
      className="mr-4 flex flex-col justify-center items-center lg:text-lg xl:mr-6 xl:mt-6"
    >
      {data.type === "hourly" ? <p>{timeValue}:00</p> : <p>{timeValue}</p>}
      {/* <p>{timeValue}:00</p> */}
      <img
        src={`/assets/icons/weather/${data.payload.weather[0].icon}.svg`}
        alt={`${data.payload.weather[0].description}`}
        className="h-12 w-12 fill-current"
      />
      <p className="lg:text-lg">{tempValue}&deg;c</p>
    </div>
  );
}

export default ForecastItem;
