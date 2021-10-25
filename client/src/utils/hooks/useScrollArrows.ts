import { useEffect, useState } from "react";

const initialArrows: IArrowDirection = { left: false, right: true };

/**
 * Handles the arrow changes based on the scroll position of the provided `element`
 * @param element - the element that is being used during the scroll event `HTMLDivElement`
 * @returns a stateful value, and a function to update it (`arrowsDirection`, `setArrowsDirection`)
 *
 * - `arrowsDirection` `state` which is a `boolean` object with `left` and `right` to determine if to display them. `{ left: boolean, right: boolean }`.
 * - `setArrowsDirection` to set new conditions if needed (for example, based on screen size)
 * @example
 * const ref = useRef(null)
 * const [arrowsDirection, setArrowsDirection] = useScrollArrows(ref.current); // makes a reference to a HTMLDivElement from the DOM.
 * ...
 * return <div ref={ref}>scroll div element</div>
 *  */
export const useScrollArrows = (
  element: HTMLDivElement | null
): useScrollArrowsReturn => {
  const [position, setPosition] = useState<number>(0);
  const [startPosition, setStartPosition] = useState<number>(0);
  const [arrowsDirection, setArrowsDirection] =
    useState<IArrowDirection>(initialArrows);

  const listener = () => {
    if (element) {
      const { scrollLeft, clientWidth, scrollWidth } = element;
      setPosition(scrollWidth - scrollLeft - clientWidth);
      setStartPosition(scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    if (!element) return;
    element.addEventListener("scroll", listener);

    return () => element.removeEventListener("scroll", listener);
  }, [element]);

  useEffect(() => {
    if (position === startPosition)
      return setArrowsDirection({ left: false, right: true });
    if (position < 1) return setArrowsDirection({ left: true, right: false });
    if (position > 0 && position < startPosition)
      return setArrowsDirection({ left: true, right: true });
  }, [position]);

  return [arrowsDirection, setArrowsDirection];
};
