import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import { Reveal } from '../components/Reveal/Reveal';
import { scaleIn, staggerContainer } from '../utils/transitions';
import styles from './GalleryPage.module.css';

const ALL_IMAGES = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',  alt: 'Hotel Lobby',     category: 'Facilities' },
  { id: 2,  src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', alt: 'Deluxe Suite',    category: 'Rooms' },
  { id: 3,  src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', alt: 'Pool View',       category: 'Facilities' },
  { id: 4,  src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Fine Dining',     category: 'Dining' },
  { id: 5,  src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', alt: 'Superior Room',   category: 'Rooms' },
  { id: 6,  src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80',    alt: 'Rooftop Bar',     category: 'Dining' },
  { id: 7,  src: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', alt: 'Hotel Exterior',  category: 'Facilities' },
  { id: 8,  src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', alt: 'Villa Suite',     category: 'Rooms' },
  { id: 9,  src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80', alt: 'Spa Treatment',   category: 'Facilities' },
  { id: 10, src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', alt: 'Penthouse Suite', category: 'Rooms' },
  { id: 11, src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80', alt: 'Breakfast',       category: 'Dining' },
  { id: 12, src: 'https://images.unsplash.com/photo-1592229505726-ca121723b8ef?w=800&q=80', alt: 'Infinity Pool',   category: 'Facilities' },
];

const CATEGORIES = ['All', 'Rooms', 'Dining', 'Facilities'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeCategory === 'All'
      ? ALL_IMAGES
      : ALL_IMAGES.filter((img) => img.category === activeCategory);

  const closeLightbox = () => setLightbox(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight' && lightbox) {
      const idx = filtered.findIndex((i) => i.id === lightbox.id);
      if (idx < filtered.length - 1) setLightbox(filtered[idx + 1]);
    }
    if (e.key === 'ArrowLeft' && lightbox) {
      const idx = filtered.findIndex((i) => i.id === lightbox.id);
      if (idx > 0) setLightbox(filtered[idx - 1]);
    }
  };

  return (
    <PageWrapper>
      <div className={styles.page} onKeyDown={handleKeyDown} tabIndex={-1}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Visual Journey</p>
            <h1 className={styles.title}>The Gallery</h1>
            <p className={styles.subtitle}>
              A curated collection of moments that define the Lumière experience
            </p>
          </div>
        </Reveal>

        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.button
                key={img.id}
                layout
                className={styles.item}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightbox(img)}
                aria-label={`View ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} className={styles.img} loading="lazy" />
                <div className={styles.overlay}>
                  <span className={styles.overlayText}>{img.alt}</span>
                  <span className={styles.overlayCategory}>{img.category}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              className={styles.lightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
                <button className={styles.lightboxClose} onClick={closeLightbox}>×</button>
                <motion.img
                  src={lightbox.src}
                  alt={lightbox.alt}
                  className={styles.lightboxImg}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className={styles.lightboxCaption}>
                  <span className={styles.lightboxAlt}>{lightbox.alt}</span>
                  <span className={styles.lightboxCat}>{lightbox.category}</span>
                </div>
              </div>
              <div className={styles.lightboxNav}>
                {filtered.findIndex((i) => i.id === lightbox.id) > 0 && (
                  <button
                    className={`${styles.navBtn} ${styles.navPrev}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = filtered.findIndex((i) => i.id === lightbox.id);
                      setLightbox(filtered[idx - 1]);
                    }}
                  >
                    ‹
                  </button>
                )}
                {filtered.findIndex((i) => i.id === lightbox.id) < filtered.length - 1 && (
                  <button
                    className={`${styles.navBtn} ${styles.navNext}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const idx = filtered.findIndex((i) => i.id === lightbox.id);
                      setLightbox(filtered[idx + 1]);
                    }}
                  >
                    ›
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
