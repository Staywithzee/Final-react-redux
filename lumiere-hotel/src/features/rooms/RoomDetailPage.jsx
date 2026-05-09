import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetRoomByIdQuery } from './roomsApi';
import { selectRoom, setDates, setGuests } from '../booking/bookingSlice';
import { selectTotalNights, selectTotalPrice } from '../booking/bookingSelectors';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './RoomDetailPage.module.css';

const amenityIcons = {
  WiFi: '◈', Bathtub: '◎', Minibar: '◇', 'Sea View': '◉',
  Pool: '○', Spa: '✦', Balcony: '□', Breakfast: '❧',
  Gym: '△', Parking: '◻', 'Air Conditioning': '❄', Butler: '✧',
};

function formatPrice(n) {
  return Number(n).toLocaleString('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  });
}

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

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className={styles.skeletonPage}>
        <div className={styles.skeletonHero} />
        <div className={styles.skeletonBody}>
          <div className={styles.skeletonContent}>
            {[80, 50, 100, 70, 90].map((w, i) => (
              <div key={i} className={styles.skeletonLine} style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className={styles.skeletonWidget} />
        </div>
      </div>
    );
  }

  if (isError) return <div className={styles.errorWrap}><ErrorMessage message={error?.data?.message ?? 'Room not found.'} /></div>;
  if (!room) return null;

  const amenityList = Array.isArray(room.amenities)
    ? room.amenities
    : String(room.amenities || '').split(',').map((a) => a.trim()).filter(Boolean);

  return (
    <div className={styles.page}>

      {/* ── HERO IMAGE ── */}
      <div className={styles.hero}>
        <img src={room.imageUrl} alt={room.name} className={styles.heroImg} />
        <div className={styles.heroGradient} />

        {/* Back button */}
        <button className={styles.back} onClick={() => navigate('/rooms')}>
          ← Rooms
        </button>

        {/* Unavailable ribbon */}
        {!room.available && (
          <div className={styles.unavailableRibbon}>Currently Unavailable</div>
        )}

        {/* Room identity overlay */}
        <div className={styles.heroInfo}>
          <span className={styles.heroCat}>{room.category}</span>
          <h1 className={styles.heroName}>{room.name}</h1>
          <div className={styles.heroMeta}>
            <span>{room.maxGuests} Guests</span>
            <span className={styles.heroDot}>·</span>
            <span>{room.size} m²</span>
            <span className={styles.heroDot}>·</span>
            <span>{formatPrice(room.pricePerNight)} / night</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className={styles.body}>

        {/* LEFT: Details */}
        <div className={styles.details}>

          {/* Description */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About This Room</h2>
            <p className={styles.description}>{room.description}</p>
          </section>

          <div className={styles.divider} />

          {/* Amenities */}
          {amenityList.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Amenities</h2>
              <div className={styles.amenities}>
                {amenityList.map((a) => (
                  <div key={a} className={styles.amenityItem}>
                    <span className={styles.amenityIcon}>
                      {amenityIcons[a] || '·'}
                    </span>
                    <span className={styles.amenityName}>{a}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className={styles.divider} />

          {/* Policies */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Policies</h2>
            <div className={styles.policies}>
              <div className={styles.policy}>
                <span className={styles.policyLabel}>Check-in</span>
                <span className={styles.policyVal}>From 15:00</span>
              </div>
              <div className={styles.policy}>
                <span className={styles.policyLabel}>Check-out</span>
                <span className={styles.policyVal}>Until 12:00</span>
              </div>
              <div className={styles.policy}>
                <span className={styles.policyLabel}>Cancellation</span>
                <span className={styles.policyVal}>Free up to 48h before arrival</span>
              </div>
              <div className={styles.policy}>
                <span className={styles.policyLabel}>Pets</span>
                <span className={styles.policyVal}>Not permitted</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT: Booking Widget */}
        <aside className={styles.widget}>
          <div className={styles.widgetPrice}>
            <span className={styles.priceAmt}>{formatPrice(room.pricePerNight)}</span>
            <span className={styles.pricePer}>per night</span>
          </div>

          <div className={styles.dateRow}>
            <div className={styles.dateField}>
              <label className={styles.fieldLabel}>Check-In</label>
              <input
                type="date"
                className={styles.fieldInput}
                min={today}
                value={booking.checkIn}
                onChange={(e) =>
                  dispatch(setDates({ checkIn: e.target.value, checkOut: booking.checkOut }))
                }
              />
            </div>
            <div className={styles.dateDivider} />
            <div className={styles.dateField}>
              <label className={styles.fieldLabel}>Check-Out</label>
              <input
                type="date"
                className={styles.fieldInput}
                min={booking.checkIn || today}
                value={booking.checkOut}
                onChange={(e) =>
                  dispatch(setDates({ checkIn: booking.checkIn, checkOut: e.target.value }))
                }
              />
            </div>
          </div>

          <div className={styles.guestsField}>
            <label className={styles.fieldLabel}>Guests</label>
            <select
              className={styles.fieldInput}
              value={booking.guests}
              onChange={(e) => dispatch(setGuests(Number(e.target.value)))}
            >
              {[...Array(Math.max(1, Number(room.maxGuests) || 1))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {totalNights > 0 && (
            <div className={styles.priceBreakdown}>
              <div className={styles.breakdownRow}>
                <span>{formatPrice(room.pricePerNight)} × {totalNights} {totalNights === 1 ? 'night' : 'nights'}</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          )}

          <button className={styles.bookBtn} onClick={handleBook} disabled={!room.available}>
            {room.available ? 'Reserve This Room' : 'Currently Unavailable'}
          </button>

          <p className={styles.widgetNote}>No charge until confirmation · Free cancellation</p>
        </aside>
      </div>
    </div>
  );
}
