import { Link } from 'react-router-dom';
import styles from './RoomCard.module.css';

export default function RoomCard({ room }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={room.imageUrl} alt={room.name} className={styles.image} loading="lazy" />
        {!room.available && <span className={styles.unavailableBadge}>Unavailable</span>}
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{room.category}</span>
        <h3 className={styles.name}>{room.name}</h3>
        <div className={styles.meta}>
          <span>{room.maxGuests} Guests</span>
          <span className={styles.dot}>·</span>
          <span>{room.size} m²</span>
        </div>
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.amount}>
              {Number(room.pricePerNight).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}
            </span>
            <span className={styles.per}>/night</span>
          </div>
          <Link to={`/rooms/${room.id}`} className={styles.btn}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
