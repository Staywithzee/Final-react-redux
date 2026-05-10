import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/rooms', label: 'Rooms' },
  { to: '/dining', label: 'Dining' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/booking', label: 'Book a Stay' },
  { to: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            MENU
          </button>
        </div>

        <div className={styles.divider} />

        {/* Language — hidden on mobile */}
        <div className={`${styles.segment} ${styles.segHide}`}>
          <span className={styles.lang}>EN</span>
          <span className={styles.langSlash}>/</span>
          <span className={`${styles.lang} ${styles.langOn}`}>FR</span>
        </div>

        <div className={`${styles.divider} ${styles.divHide}`} />

        {/* Logo — center */}
        <div className={`${styles.segment} ${styles.segCenter}`}>
          <Link to="/" className={styles.logo}>Lumière</Link>
        </div>

        <div className={`${styles.divider} ${styles.divHide}`} />

        {/* Dining link — hidden on mobile */}
        <div className={`${styles.segment} ${styles.segHide}`}>
          <NavLink to="/dining" className={styles.navLink}>DINING</NavLink>
        </div>

        <div className={styles.divider} />

        {/* Booking CTA */}
        <div className={`${styles.segment} ${styles.segBook}`}>
          <Link to="/booking" className={styles.bookingLink}>
            BOOKING <span className={styles.bookArrow}>→</span>
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
              ✕ CLOSE
            </button>

            <nav className={styles.overlayNav}>
              {NAV_LINKS.map(({ to, label, end }, i) => (
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
              <p className={styles.overlayTagline}>Established 1924 · Paris</p>
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
