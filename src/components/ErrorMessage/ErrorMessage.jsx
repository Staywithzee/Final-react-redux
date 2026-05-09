import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>!</div>
      <p className={styles.text}>{message || 'Something went wrong. Please try again.'}</p>
    </div>
  );
}
