export type handleScrollClickType = (
  element: HTMLDivElement,
  change: number,
  duration: number
) => void;

export type easeInOutQuadType = (
  currentTime: number,
  startValue: number,
  changeValue: number,
  duration: number
) => number;
