import { useEffect, useState } from "react";

// hook - listens to the "change" event on "window" and matches any media queries.

/**
 * Listens to the `change` event on `window` and matches any media queries that are being passed in `query`.
 *
 * @param query - The query that you want to target
 * @returns a `boolean` that indicates whether or not the current query is active.
 * @example
 * const isMedium = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)"); // specific
 * const useIsNotMobile = useMediaQuery("(min-width: 768px)"); // tablet and up
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) return setMatches(media.matches);
    const listener = () => setMatches(media.matches);

    // iPad still uses "addListener" and not "addEventListener"
    if (navigator.userAgent.includes("iPad")) {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
};

// Breakpoints - from sm to 2xl

/**
 *  Checks the media query of `small` screens - `min-width: 640px` and `max-width: 767px`
 * @returns `boolean`
 */
export const useIsSmall = () =>
  useMediaQuery("(min-width: 640px) and (max-width: 767px)");

/**
 *  Checks the media query of `medium` screens `min-width: 768px` and `max-width: 1023px`
 * @returns `boolean`
 */
export const useIsMedium = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

/**
 *  Checks the media query of `large` screens `min-width: 1024px` and `max-width: 1279px`
 * @returns `boolean`
 */
export const useIsLarge = () =>
  useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");

/**
 *  Checks the media query of `XL` screens `min-width: 1280px` and `max-width: 1535px`
 * @returns `boolean`
 */
export const useIsXL = () =>
  useMediaQuery("(min-width: 1280px) and (max-width: 1535px)");

/**
 *  Checks the media query of `XXL` screens `min-width: 1536px` and above
 * @returns `boolean`
 */
export const useIsXXL = () => useMediaQuery("(min-width: 1536px)");

/**
 *  Checks the media query of `tablet` screens `min-width: 768px` and above.
 *
 * @returns `boolean`
 */
export const useIsNotMobile = () => useMediaQuery("(min-width: 768px)"); // targets tablet and up
