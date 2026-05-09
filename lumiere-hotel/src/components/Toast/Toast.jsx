import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../features/ui/uiSlice';
import styles from './Toast.module.css';

export default function Toast() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => dispatch(clearNotification()), 3000);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className={`${styles.toast} ${styles[notification.type]}`}>
      <span className={styles.message}>{notification.message}</span>
      <button className={styles.close} onClick={() => dispatch(clearNotification())} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
