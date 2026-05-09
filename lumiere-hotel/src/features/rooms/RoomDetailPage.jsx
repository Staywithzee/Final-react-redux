import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRoomByIdQuery } from './roomsApi';
import { selectRoom, setDates, setGuests } from '../booking/bookingSlice';
import { selectTotalNights, selectTotalPrice } from '../booking/bookingSelectors';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './RoomDetailPage.module.css';

export default function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: room, isLoading, isError, error } = useGetRoomByIdQuery(id);
  const booking = useSelector((state) => state.booking);
  const totalNights = useSelector(selectTotalNights);
  const totalPrice = useSelector(selectTotalPrice);

  const today = new Date().toISOString().split('T')[0];

  const handleBook = () => {
    if (!room) return;
    dispatch(selectRoom(room));
    navigate('/booking');
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.skeletonGrid}>
          <div className={`${styles.skeletonImg} ${styles.shimmer}`} />
          <div className={styles.skeletonInfo}>
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <ErrorMessage message={error?.data?.message ?? 'Room not found.'} />
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/rooms')}>
        ← Back to Rooms
      </button>

      <div className={styles.layout}>
        {/* LEFT: Main content */}
        <div className={styles.main}>
          <div className={styles.imageWrap}>
            <img src={room.imageUrl} alt={room.name} className={styles.image} />
            {!room.available && (
              <div className={styles.unavailableBanner}>Currently Unavailable</div>
            )}
          </div>

          <div className={styles.content}>
            <div className={styles.contentTop}>
              <span className={styles.category}>{room.category}</span>
              <h1 className={styles.name}>{room.name}</h1>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>
                  <strong>{room.maxGuests}</strong> Guests
                </span>
                <span className={styles.metaDot}>·</span>
                <span className={styles.metaItem}>
                  <strong>{room.size}</strong> m²
                </span>
              </div>
            </div>

            <p className={styles.description}>{room.description}</p>

            <div className={styles.amenitiesSection}>
              <h3 className={styles.amenitiesTitle}>Amenities</h3>
              <div className={styles.amenities}>
                {Array.isArray(room.amenities)
                  ? room.amenities.map((a) => (
                      <span key={a} className={styles.chip}>
                        {a}
                      </span>
                    ))
                  : String(room.amenities)
                      .split(',')
                      .map((a) => (
                        <span key={a} className={styles.chip}>
                          {a.trim()}
                        </span>
                      ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Booking widget */}
        <div className={styles.widget}>
          <div className={styles.widgetHeader}>
            <span className={styles.widgetPrice}>
              {Number(room.pricePerNight).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              })}
            </span>
            <span className={styles.widgetPer}>/night</span>
          </div>

          <div className={styles.widgetFields}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Check-In</label>
              <input
                type="date"
                className={styles.input}
                min={today}
                value={booking.checkIn}
                onChange={(e) =>
                  dispatch(setDates({ checkIn: e.target.value, checkOut: booking.checkOut }))
                }
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Check-Out</label>
              <input
                type="date"
                className={styles.input}
                min={booking.checkIn || today}
                value={booking.checkOut}
                onChange={(e) =>
                  dispatch(setDates({ checkIn: booking.checkIn, checkOut: e.target.value }))
                }
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Guests</label>
              <select
                className={styles.input}
                value={booking.guests}
                onChange={(e) => dispatch(setGuests(Number(e.target.value)))}
              >
                {[...Array(room.maxGuests)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {totalNights > 0 && (
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>
                  {Number(room.pricePerNight).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  })}{' '}
                  × {totalNights} {totalNights === 1 ? 'night' : 'nights'}
                </span>
                <span>
                  {totalPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>
                  {totalPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          )}

          <button
            className={styles.bookBtn}
            onClick={handleBook}
            disabled={!room.available}
          >
            {room.available ? 'Book This Room' : 'Not Available'}
          </button>
        </div>
      </div>
    </div>
  );
}
