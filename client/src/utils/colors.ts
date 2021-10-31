/* --- CSS --- */

/**
 * Set the desired CSS variable to the `value`
 *
 * @param variableName - the CSS variable name
 * @param value - the value that will be set into the `variableName` CSS variable
 * @example
 * setCSSVariable("--color-player-main", "#ffe375")
 */
export const setCSSVariable = (variableName: string, value: string): void => {
  document.documentElement.style.setProperty(variableName, value, "important");
};

/* --- Image & Color Palette --- */

/**
 * Creates a new image and wait for it to loads before resolving the promise.
 * @param imageURL - the image URL, used for the source `string`
 * @returns a loaded image element
 * @example createImage("https://via.placeholder.com/150")
 */
export const createImage = (imageURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const trackImg = new Image();
    trackImg.crossOrigin = "Anonymous";
    trackImg.src = imageURL;
    trackImg.onload = () => resolve(trackImg);
    trackImg.onerror = () => reject("⛔ ☝ something went wrong ☝ ⛔");
  });
};

/**
 * Creates a new `canvas` 1x1 and a 2D `context`
 * @returns a canvas 2d context object
 */
const createCanvasContext = (): CanvasRenderingContext2D | null => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  return ctx;
};

/**
 * Getting the correct colors based on the main color.
 *
 * Takes RGB values as the arguments
 * @param r - Red `number`
 * @param g - Green `number`
 * @param b - Blue `number`
 * @returns a color palettes object with `main` and `secondary` colors
 */
const getColors = (r: number, g: number, b: number): TcolorPalette => {
  const { h, s } = RGBToHSL(r, g, b);
  return {
    main: HSLToHex(h, s, 70),
    secondary: HSLToHex(h, s, 40),
    indicator: HSLToHex(h, 90, 50),
  };
};

/**
 * Generating a color palette based on the `image` element.
 *
 * This function creates a new canvas 2D context that is being used to get the main color of the image
 * using `getColors` function.
 * @param image a HTML Image Element `HTMLImageElement`
 * @returns a color palettes object with `main` and `secondary` colors.
 */
export const generateColorPalette = (
  image: HTMLImageElement
): TcolorPalette => {
  const context = createCanvasContext();
  if (context) {
    context.drawImage(image, 0, 0, 1, 1, 0, 0, 1, 1);
    const rgba = context.getImageData(0, 0, 1, 1).data;
    const palette = getColors(rgba[0], rgba[1], rgba[2]);
    return palette;
  }
  return { main: "#000", secondary: "#000", indicator: "#fff" };
};

/* --- Color Conversions --- */

/**
 * Takes `HSL` values and convert them into `HEX`
 * @param h - Hue `number`
 * @param s - Saturation `number`
 * @param l - Lightness `number`
 * @returns a `HEX` value `string`
 * @example HSLToHex(48, 100, 72.9)
 */
export const HSLToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  let c: number = (1 - Math.abs(2 * l - 1)) * s,
    x: number = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m: number = l - c / 2,
    r: number | string = 0,
    g: number | string = 0,
    b: number | string = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return `#${r}${g}${b}`;
};

/**
 * Takes `RGB` values and convert them into `HSL` values
 * @param r - Red `number`
 * @param g - Green `number`
 * @param b - Blue `number`
 * @returns a `HSL` object `{ h: number, s: number, l: number }`
 * @example RGBToHSL(255, 227, 117)
 */
export const RGBToHSL = (r: number, g: number, b: number): HSL => {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    l = (cmax + cmin) / 2, // Calculate lightness
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1)); // Calculate saturation

  // Calculate hue

  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
};
