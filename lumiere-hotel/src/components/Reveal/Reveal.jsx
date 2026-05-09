import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { revealVariants } from '../../utils/transitions';

export function Reveal({ children, delay = 0, className }) {
  const { ref, isInView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={revealVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ ...revealVariants.visible.transition, delay }}
    >
      {children}
    </motion.div>
  );
}
