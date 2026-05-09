import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.image}`} />
      <div className={styles.body}>
        <div className={`${styles.skeleton} ${styles.line} ${styles.short}`} />
        <div className={`${styles.skeleton} ${styles.line} ${styles.medium}`} />
        <div className={`${styles.skeleton} ${styles.line} ${styles.xshort}`} />
        <div className={styles.footer}>
          <div className={`${styles.skeleton} ${styles.line} ${styles.price}`} />
          <div className={`${styles.skeleton} ${styles.btn}`} />
        </div>
      </div>
    </div>
  );
}
