import { easeInOutQuadType, handleScrollClickType } from "../types/scroll";

export const handleScrollClick: handleScrollClickType = (
  element,
  change,
  duration
) => {
  const start = element.scrollLeft;
  let currentTime = 0,
    increment = 20;

  const animateScroll = () => {
    currentTime += increment;
    const value = easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = value;
    if (currentTime < duration) return setTimeout(animateScroll, increment);
  };
  animateScroll();
};

const easeInOutQuad: easeInOutQuadType = (
  currentTime,
  start,
  change,
  duration
) => {
  currentTime /= duration / 2;
  if (currentTime < 1) return (change / 2) * currentTime * currentTime + start;
  currentTime--;
  return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
};
