import { motion } from 'framer-motion';
import { mountVariants } from './SlidInOut';

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
