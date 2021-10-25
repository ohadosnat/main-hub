import { motion } from "framer-motion";
import LoadingCircle from "./LoadingCircle";

const variants = {
  start: { transition: { staggerChildren: 0.2 } },
  end: { transition: { staggerChildren: 0.2 } },
};

const LoadingAnimation = () => {
  return (
    <motion.div
      className="flex space-x-4"
      variants={variants}
      initial="start"
      animate="end"
    >
      <LoadingCircle />
      <LoadingCircle />
      <LoadingCircle />
    </motion.div>
  );
};

export default LoadingAnimation;
