import locationChangeHandle from "./locationFormHandle";

/**
 * Calculate the average tempature based on `min` and `max`
 *
 * @param min
 * @param max
 * @returns the average tempature `number`
 */
export const calcAvgTemp = (min: number, max: number): number =>
  (min + max) / 2;

/**
 * Gets the hours based on a `timestamp`
 * @param timestamp - unix epoch timestamp `number`
 * @returns the hours in a date, using local time
 * @example
 * const date = 1618317012; // Tuesday, April 13, 2021 12:30:12 PM
 * getHours(1618317012); // 12
 */
export const getHours = (timestamp: number): number =>
  new Date(timestamp * 1000).getHours();

/**
 * Gets the day name based on the given `date` value
 * @param date - unix epoch timestamp `number`
 * @returns the first three letters of the week day in a human readable way (e.g. `Thu`)
 */
export const getDate = (date: number): string =>
  new Date(date * 1000).toDateString().slice(0, 4);

/**
 * Converts the given temperature from `Kelvin` to `Celcius`
 * @param temp - the temperature in `Kelvin`
 * @returns - the temperature in `Celcius`
 */
export const kelvinToCelcius = (temp: number) => Math.floor(temp - 273.15);

/**
 * Generates the current time in `UNIX` Format.
 * @returns current time in `UNIX` Format
 */
export const generateTimestamp = (): number =>
  Math.floor(new Date().getTime() / 1000);

export const locationFormHandle = async (
  e: React.FormEvent<HTMLFormElement>,
  values: Record<string, string>
) => {
  e.preventDefault();
  locationChangeHandle(values.location);
  values.location = "";
};
