/**
 * Converts milliseconds to minutes
 * @param ms the time in milliseconds
 * @returns the time in `MM:SS` format
 */
export const calcMstoMin = (ms: number) => {
  const totalMin = Math.floor((ms / (1000 * 60)) % 60);
  const totalSecs =
    Math.floor((ms / 1000) % 60) < 10
      ? `0${Math.floor((ms / 1000) % 60)}`
      : Math.floor((ms / 1000) % 60);
  return `${totalMin}:${totalSecs}`;
};

/**
 * Calculates the current song progress
 * @param current - current position
 * @param duration - the overall track duration
 * @returns the current progress position.
 */
export const calcProgress = (current: number, duration: number) => {
  return (current / duration) * 100;
};
