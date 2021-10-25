import { useEffect, useState } from "react";
import { createImage, generateColorPalette, setCSSVariable } from "../colors";

// Initial state for cleaner useState
const initialState: TcolorPalette = {
  main: "#000",
  secondary: "#000",
  indicator: "#fff",
};

/**
 * Generates a color palette based on `imgURL`.
 *
 * The colors will be set in a global CSS variables
 * (`--color-player-main` and `--color-player-secondary`)
 * @param imgURL - the image url address
 * @example
 * useGenerateColors("https://via.placeholder.com/150")
 */
export const useGenerateColors = (imgURL: string): void => {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );
  const [colorPalette, setColorPalette] = useState<TcolorPalette>(initialState);

  // each time the image url changes, create a new and set it.
  useEffect(() => {
    if (imgURL === "") return;
    createImage(imgURL)
      .then((element) => setImageElement(element))
      .catch((error) => console.error(error));
  }, [imgURL]);

  // when the image changes, generate a color palette based on that
  useEffect(() => {
    if (!imageElement) return;
    setColorPalette(generateColorPalette(imageElement));
  }, [imageElement]);

  // when color palette changes, set the new colors to the global CSS variables
  useEffect(() => {
    setCSSVariable("--color-player-main", colorPalette.main);
    setCSSVariable("--color-player-secondary", colorPalette.secondary);
    setCSSVariable("--color-indicator", colorPalette.indicator);
    setCSSVariable("--color-skin", colorPalette.main);
  }, [colorPalette]);
};
