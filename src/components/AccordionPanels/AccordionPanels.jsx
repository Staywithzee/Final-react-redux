import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './AccordionPanels.module.css';

// panels = [{ id, tab, title, imageUrl, exploreLink }]
export function AccordionPanels({ panels }) {
  const [activeId, setActiveId] = useState(panels[0].id);

  return (
    <div className={styles.wrapper}>
      {/* Tab selector row */}
      <div className={styles.tabs}>
        {panels.map((panel) => (
          <button
            key={panel.id}
            className={`${styles.tab} ${activeId === panel.id ? styles.tabActive : ''}`}
            onClick={() => setActiveId(panel.id)}
          >
            {activeId === panel.id && (
              <motion.span
                layoutId="tabCircle"
                className={styles.tabCircle}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {panel.tab}
          </button>
        ))}
      </div>

      {/* Accordion image row */}
      <div className={styles.panelRow}>
        {panels.map((panel) => {
          const isActive = activeId === panel.id;
          return (
            <motion.div
              key={panel.id}
              className={styles.panel}
              layout
              animate={{
                flexGrow: isActive ? 5 : 1,
                filter: isActive ? 'brightness(1)' : 'brightness(0.45)',
              }}
              transition={{
                layout: { type: 'spring', stiffness: 200, damping: 28 },
                filter: { duration: 0.4 },
                flexGrow: { type: 'spring', stiffness: 200, damping: 28 },
              }}
              onClick={() => setActiveId(panel.id)}
              style={{ cursor: isActive ? 'default' : 'pointer' }}
            >
              {/* Background image */}
              <motion.div
                className={styles.panelBg}
                style={{ backgroundImage: `url(${panel.imageUrl})` }}
                animate={{ scale: isActive ? 1.0 : 1.08 }}
                transition={{ type: 'spring', stiffness: 120, damping: 25 }}
              />

              {/* Overlay gradient */}
              <div className={styles.panelOverlay} />

              {/* Content — only visible when active */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key="content"
                    className={styles.panelContent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                  >
                    <p className={styles.panelTitle}>{panel.title}</p>
                    <Link to={panel.exploreLink} className={styles.exploreBtn}>
                      EXPLORE <span>→</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slim label — shown on inactive panels */}
              <AnimatePresence>
                {!isActive && (
                  <motion.span
                    key="slimLabel"
                    className={styles.slimLabel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {panel.tab}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
