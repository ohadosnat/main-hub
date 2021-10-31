import { motion } from "framer-motion";
import { LoadingCircleVariants } from "../../utils/animationVariants";

const LoadingCircle = () => {
  return (
    <motion.span
      className="w-4 h-4 rounded-full bg-current"
      variants={LoadingCircleVariants}
      transition={{
        repeatType: "reverse",
        repeat: Infinity,
        duration: 0.5,
        ease: "easeInOut",
      }}
    />
  );
};

export default LoadingCircle;
