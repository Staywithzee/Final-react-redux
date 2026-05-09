import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.text}>
          The page you are looking for seems to have checked out. Allow us to guide you back.
        </p>
        <Link to="/" className={styles.btn}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
