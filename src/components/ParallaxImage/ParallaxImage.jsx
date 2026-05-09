import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './ParallaxImage.module.css';

export function ParallaxImage({ src, alt, speed = 0.15, className }) {
  const ref = useRef(null);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : [`-${speed * 100}%`, `${speed * 100}%`]
  );
  return (
    <div ref={ref} className={`${styles.wrap} ${className || ''}`}>
      <motion.img src={src} alt={alt} style={{ y }} className={styles.img} />
    </div>
  );
}
