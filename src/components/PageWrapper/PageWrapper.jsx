import { motion } from 'framer-motion';
import { pageVariants } from '../../utils/transitions';

export function PageWrapper({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}
