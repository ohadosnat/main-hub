import { useEffect, useState } from "react";

/**
 * Creates a new clock that is being updated.
 *
 * @returns the current time as a `string` in the format of `HH:MM`
 * @example "04:20"
 */
export const useClock = (): string => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeLeft = 60000 - (time.getTime() % 60000); // time left for the next minute
    const timer = setInterval(() => {
      setTime(new Date());
    }, timeLeft);
    return () => clearInterval(timer);
  }, [time]);

  return time.toString().slice(16, 21);
};
