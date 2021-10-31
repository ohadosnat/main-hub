import { Variants } from "framer-motion";

export const modalVariants: Variants = {
  closed: { y: -5, opacity: 0, transitionEnd: { display: "none" } },
  open: { y: 0, opacity: 1, display: "flex" },
};

export const AppVariants: Variants = {
  open: { opacity: 1 },
  closed: { opacity: 0, display: "hidden" },
};

export const LoadingVariants: Variants = {
  start: { transition: { staggerChildren: 0.2 } },
  end: { transition: { staggerChildren: 0.2 } },
};

export const LoadingCircleVariants: Variants = {
  start: { y: "0%" },
  end: { y: "100%" },
};

export const PopupModalVariants: Variants = {
  start: { opacity: 0, y: -20 },
  end: { opacity: 1, y: 0 },
};
