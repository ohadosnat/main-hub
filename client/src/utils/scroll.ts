import { useEffect, useState } from "react";

/**
 * Handles a `scroll` event on elements that need to have scroll buttons manually.
 *
 * @param element - the element you want the scroll to be `HTMLElement`
 * @param change - determines how much you want to scroll each click `number`
 * @param duration - the duration of the scroll animation `number`
 * @example
 *  handleScrollClick(myElement, 100, 350); // will move 100px to the left during 350ms
 *  handleScrollClick(myElement, -100, 350); // will move 100px to the right during 350ms
 */
export const handleScrollClick = (
  element: HTMLElement,
  change: number,
  duration: number
): void => {
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

/**
 * Creates a `ease-in-out-quad` animation effect.
 *
 * @param currentTime
 * @param start
 * @param change
 * @param duration
 * @returns the current position `number`
 * @example
 * easeInOutQuad(0, 0, 100, 350);
 */
const easeInOutQuad = (
  currentTime: number,
  start: number,
  change: number,
  duration: number
): number => {
  currentTime /= duration / 2;
  if (currentTime < 1) return (change / 2) * currentTime * currentTime + start;
  currentTime--;
  return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
};
