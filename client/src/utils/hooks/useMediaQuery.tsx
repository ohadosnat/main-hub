import { useEffect, useState } from "react";

// hook - listens to the "change" event on "window" and matches any media queries.
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) return setMatches(media.matches);
    const listener = () => setMatches(media.matches);

    // for iPad, still uses "addListener" and not "addEventListener"
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
// FIXME: UPDATE THAT IT WILL MATCH MIN AND MAX WIDTH
export const useIsSmall = () => useMediaQuery("(min-width: 640px)");
export const useIsMedium = () => useMediaQuery("(min-width: 768px)");
export const useIsLarge = () => useMediaQuery("(min-width: 1024px)");
export const useIsXL = () => useMediaQuery("(min-width: 1280px)");
export const useIsXXL = () => useMediaQuery("(min-width: 1536px)");
