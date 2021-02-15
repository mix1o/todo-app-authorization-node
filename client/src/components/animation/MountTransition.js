import { motion } from 'framer-motion';
import { mountVariants, slidInVariants, staggerVariants } from './SlidInOut';

export const MountTransition = ({ children }) => {
  return (
    <motion.div
      variants={mountVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export const SlidInContainer = ({ children }) => {
  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export const MotionSlidIn = ({ children }) => {
  return <motion.div variants={slidInVariants}>{children}</motion.div>;
};
