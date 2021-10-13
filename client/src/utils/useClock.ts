import { useEffect, useState } from "react";

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
