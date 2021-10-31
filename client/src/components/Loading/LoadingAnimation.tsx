import { motion } from "framer-motion";
import { LoadingVariants } from "../../utils/animationVariants";
import LoadingCircle from "./LoadingCircle";

const LoadingAnimation = () => {
  return (
    <motion.div
      className="flex space-x-4"
      variants={LoadingVariants}
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
