import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Reveal } from '../Reveal/Reveal';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className={styles.footer}>
      <Reveal>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.logo}>LUMIÈRE</span>
            <p className={styles.tagline}>{f.tagline}</p>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{f.navigate}</h4>
              <Link to="/"        className={styles.colLink}>{f.links.home}</Link>
              <Link to="/rooms"   className={styles.colLink}>{f.links.rooms}</Link>
              <Link to="/dining"  className={styles.colLink}>{f.links.dining}</Link>
              <Link to="/gallery" className={styles.colLink}>{f.links.gallery}</Link>
            </div>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{f.services}</h4>
              {f.servicesList.map((s) => (
                <span key={s} className={styles.colText}>{s}</span>
              ))}
            </div>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{f.contact}</h4>
              <span className={styles.colText}>1 Avenue des Lumières</span>
              <span className={styles.colText}>Paris, France</span>
              <span className={styles.colText}>+33 1 23 45 67 89</span>
              <span className={styles.colText}>hello@lumiere-hotel.com</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div className={styles.bottom}>
        <span>{f.rights.replace('%year', new Date().getFullYear())}</span>
        <motion.div whileHover={{ x: 2 }} style={{ display: 'inline-block' }}>
          <Link to="/admin" className={styles.adminLink}>{f.admin}</Link>
        </motion.div>
      </div>
    </footer>
  );
}
