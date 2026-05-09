import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>LUMIÈRE</span>
          <p className={styles.tagline}>Where luxury meets tranquility</p>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigate</h4>
            <Link to="/" className={styles.colLink}>Home</Link>
            <Link to="/rooms" className={styles.colLink}>Rooms & Suites</Link>
            <Link to="/dining" className={styles.colLink}>Dining</Link>
            <Link to="/gallery" className={styles.colLink}>Gallery</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Services</h4>
            <span className={styles.colText}>Spa & Wellness</span>
            <span className={styles.colText}>Concierge</span>
            <span className={styles.colText}>Infinity Pool</span>
            <span className={styles.colText}>Event Spaces</span>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <span className={styles.colText}>1 Avenue des Lumières</span>
            <span className={styles.colText}>Paris, France</span>
            <span className={styles.colText}>+33 1 23 45 67 89</span>
            <span className={styles.colText}>hello@lumiere-hotel.com</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Lumière Hotel. All rights reserved.</span>
        <Link to="/admin" className={styles.adminLink}>Admin</Link>
      </div>
    </footer>
  );
}
