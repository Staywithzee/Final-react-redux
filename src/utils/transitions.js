// ─── PAGE TRANSITION PRESETS ────────────────────────────────────────────────

export const pageVariants = {
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -20, filter: 'blur(4px)', transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
};

export const heroVariants = {
  initial: { opacity: 0, scale: 1.04 },
  enter:   { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

export const revealVariants = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const slideLeft = {
  hidden:  { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export const slideRight = {
  hidden:  { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export const lineReveal = {
  hidden:  { y: '110%' },
  visible: (i = 0) => ({
    y: '0%',
    transition: { duration: 0.85, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const PARALLAX_RANGE = ['-15%', '15%'];
