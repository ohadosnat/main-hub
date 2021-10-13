export const calcAvgTemp = (min: number, max: number): number => min + max / 2;

export const getHours = (timestamp: number): number =>
  new Date(timestamp).getHours();
