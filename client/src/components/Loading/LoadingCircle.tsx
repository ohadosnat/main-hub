import { motion } from "framer-motion";

const variants = {
  start: { y: "0%" },
  end: { y: "100%" },
};

const LoadingCircle = () => {
  return (
    <motion.span
      className="w-4 h-4 rounded-full bg-current"
      variants={variants}
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
