/* Scroll Types */

interface IArrowDirection {
  left: boolean;
  right: boolean;
}

type useScrollArrowsReturn = [
  IArrowDirection,
  React.Dispatch<React.SetStateAction<IArrowDirection>>
];

/* Colors Types */

type HSL = { h: number; s: number; l: number };
type TcolorPalette = { main: string; secondary: string };

/* General */
// Apps to display
interface IApps {
  name: string;
  icon: JSX.Element;
}
