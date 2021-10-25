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
type TcolorPalette = { main: string; secondary: string; indicator: string };

/* General */

// Apps to display
interface IApps {
  name: string;
  icon: JSX.Element;
}

/**
 * The Error Message Format for all requests.
 * @param message - should contain what was failed
 * @param error - the actual error
 */
interface ErrorMessage {
  message: string;
  error: unknown;
}

/*Forms & Inputs Types */
type onChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>;

type useFormReturnType = [
  Record<string, string>,
  (e: onChangeEventType) => void
];
