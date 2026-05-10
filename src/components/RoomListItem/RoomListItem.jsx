import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './RoomListItem.module.css';

function formatPrice(n) {
  return Number(n).toLocaleString('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  });
}

export function RoomListItem({ room, index }) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={styles.roomRow}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left: text info */}
      <div className={styles.roomInfo}>
        <span className={styles.roomCategory}>{room.category}</span>
        <h3 className={styles.roomName}>{room.name}</h3>
        <p className={styles.roomMeta}>
          {room.maxGuests} Guests &nbsp;|&nbsp; {room.size} m²
          {room.size ? ` | ${(room.size * 10.76) | 0} sq ft` : ''}
        </p>
        <p className={styles.roomDesc}>{room.description}</p>
        <Link to={`/rooms/${room.id}`} className={styles.detailsLink}>
          Room Details <span>→</span>
        </Link>
        <div className={styles.roomFacts}>
          <span className={styles.roomPrice}>
            {formatPrice(room.pricePerNight)}
            <span className={styles.roomPricePer}> / night</span>
          </span>
          <span className={`${styles.availBadge} ${room.available ? styles.available : styles.unavailable}`}>
            {room.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>

      {/* Right: image strip — 3 images, middle one tallest */}
      <div className={styles.imageStrip}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`${styles.stripImage} ${i === 1 ? styles.stripImageTall : ''}`}
            style={{ backgroundImage: `url(${room.imageUrl}?w=${400 + i * 100}&q=75)` }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </div>
    </motion.div>
  );
}
