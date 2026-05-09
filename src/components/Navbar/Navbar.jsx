import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = `${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`;

  return (
    <header className={navClass}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          LUMIÈRE
        </Link>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Rooms
          </NavLink>
          <NavLink
            to="/dining"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Dining
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Admin
          </NavLink>
        </nav>

        <Link to="/booking" className={styles.cta} onClick={() => setMenuOpen(false)}>
          Book Now
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
        </button>
      </div>
    </header>
  );
}
