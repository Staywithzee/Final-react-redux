import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const toggleLang = (target) => {
    if (target !== lang) setLang(target);
  };

  return (
    <>
      {/* ── Segmented bar ─────────────────────────────────────── */}
      <nav className={styles.nav}>
        {/* MENU */}
        <div className={styles.segment}>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className={styles.menuLines} />
            {t.nav.menu}
          </button>
        </div>

        <div className={styles.divider} />

        {/* Language switcher — hidden on mobile */}
        <div className={`${styles.segment} ${styles.segHide}`}>
          <button
            className={`${styles.lang} ${lang === 'en' ? styles.langOn : ''}`}
            onClick={() => toggleLang('en')}
            aria-label="Switch to English"
          >
            EN
          </button>
          <span className={styles.langSlash}>/</span>
          <button
            className={`${styles.lang} ${lang === 'th' ? styles.langOn : ''}`}
            onClick={() => toggleLang('th')}
            aria-label="Switch to Thai"
          >
            TH
          </button>
        </div>

        <div className={`${styles.divider} ${styles.divHide}`} />

        {/* Logo — center */}
        <div className={`${styles.segment} ${styles.segCenter}`}>
          <Link to="/" className={styles.logo}>Lumière</Link>
        </div>

        <div className={`${styles.divider} ${styles.divHide}`} />

        {/* Dining link — hidden on mobile */}
        <div className={`${styles.segment} ${styles.segHide}`}>
          <NavLink to="/dining" className={styles.navLink}>{t.nav.dining}</NavLink>
        </div>

        <div className={styles.divider} />

        {/* Booking CTA */}
        <div className={`${styles.segment} ${styles.segBook}`}>
          <Link to="/booking" className={styles.bookingLink}>
            {t.nav.booking} <span className={styles.bookArrow}>→</span>
          </Link>
        </div>
      </nav>

      {/* ── Fullscreen overlay menu ────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className={styles.overlayClose}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              {t.nav.close}
            </button>

            <nav className={styles.overlayNav}>
              {t.nav.links.map(({ to, label, end }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.25 + i * 0.07,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `${styles.overlayLink} ${isActive ? styles.overlayActive : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={styles.overlayIdx}>0{i + 1}</span>
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className={styles.overlayBottom}>
              <p className={styles.overlayTagline}>{t.nav.tagline}</p>
              <div className={styles.overlayContacts}>
                <span>+33 1 42 86 87 88</span>
                <span>reservations@lumiere.com</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
