import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <div className={styles.page}>
        <div className={styles.content}>
          <motion.p
            className={styles.code}
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          >
            404
          </motion.p>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            className={styles.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            The page you are looking for seems to have checked out. Allow us to guide you back.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link to="/" className={styles.btn}>
              Return to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
