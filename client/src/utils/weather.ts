/**
 * Calculate the average tempature based on `min` and `max`
 *
 * @param min
 * @param max
 * @returns the average tempature `number`
 */
export const calcAvgTemp = (min: number, max: number): number => min + max / 2;

/**
 * Gets the hours based on a `timestap`
 *
 * @param timestamp - unix epoch timestamp `number`
 * @returns the hours in a date, using local time
 * @example
 * const date = 1618317012; // Tuesday, April 13, 2021 12:30:12 PM
 * getHours(1618317012); // 12
 */
export const getHours = (timestamp: number): number =>
  new Date(timestamp).getHours();
