import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useGetRoomByIdQuery } from './roomsApi';
import { selectRoom, setDates, setGuests } from '../booking/bookingSlice';
import { selectTotalNights, selectTotalPrice } from '../booking/bookingSelectors';
import { useLanguage } from '../../context/LanguageContext';
import { showNotification } from '../ui/uiSlice';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { slideLeft, slideRight, staggerContainer, staggerItem } from '../../utils/transitions';
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
  const { t } = useLanguage();
  const rd = t.roomDetail;

  const { data: room, isLoading, isError, error } = useGetRoomByIdQuery(id);
  const booking = useSelector((state) => state.booking);
  const totalNights = useSelector(selectTotalNights);
  const totalPrice = useSelector(selectTotalPrice);
  const today = new Date().toISOString().split('T')[0];

  const handleBook = () => {
    if (!room) return;
    if (!room.available) {
      dispatch(showNotification({
        message: 'This room is currently unavailable. Please contact us or choose another room.',
        type: 'error',
      }));
      return;
    }
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
    <PageWrapper>
      <div className={styles.page}>

        {/* ── HERO IMAGE ── */}
        <motion.div
          className={styles.hero}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={room.imageUrl} alt={room.name} className={styles.heroImg} />
          <div className={styles.heroGradient} />

          <button className={styles.back} onClick={() => navigate('/rooms')}>
            {rd.back}
          </button>

          {!room.available && (
            <div className={styles.unavailableRibbon}>{rd.unavailable}</div>
          )}

          <motion.div
            className={styles.heroInfo}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.heroCat}>{room.category}</span>
            <h1 className={styles.heroName}>{room.name}</h1>
            <div className={styles.heroMeta}>
              <span>{rd.guests(room.maxGuests)}</span>
              <span className={styles.heroDot}>·</span>
              <span>{room.size} m²</span>
              <span className={styles.heroDot}>·</span>
              <span>{formatPrice(room.pricePerNight)} {rd.pricePerNight}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── BODY ── */}
        <div className={styles.body}>

          {/* LEFT: Details */}
          <motion.div
            className={styles.details}
            variants={slideLeft}
            initial="hidden"
            animate="visible"
          >
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{rd.about}</h2>
              <p className={styles.description}>{room.description}</p>
            </section>

            <div className={styles.divider} />

            {amenityList.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{rd.amenities}</h2>
                <motion.div
                  className={styles.amenities}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {amenityList.map((a) => (
                    <motion.div key={a} className={styles.amenityItem} variants={staggerItem}>
                      <span className={styles.amenityIcon}>{amenityIcons[a] || '·'}</span>
                      <span className={styles.amenityName}>{a}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            )}

            <div className={styles.divider} />

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{rd.policies}</h2>
              <div className={styles.policies}>
                <div className={styles.policy}>
                  <span className={styles.policyLabel}>{rd.checkIn}</span>
                  <span className={styles.policyVal}>{rd.checkInTime}</span>
                </div>
                <div className={styles.policy}>
                  <span className={styles.policyLabel}>{rd.checkOut}</span>
                  <span className={styles.policyVal}>{rd.checkOutTime}</span>
                </div>
                <div className={styles.policy}>
                  <span className={styles.policyLabel}>{rd.cancellation}</span>
                  <span className={styles.policyVal}>{rd.cancelPolicy}</span>
                </div>
                <div className={styles.policy}>
                  <span className={styles.policyLabel}>{rd.pets}</span>
                  <span className={styles.policyVal}>{rd.petsPolicy}</span>
                </div>
              </div>
            </section>
          </motion.div>

          {/* RIGHT: Booking Widget */}
          <motion.aside
            className={styles.widget}
            variants={slideRight}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.widgetPrice}>
              <span className={styles.priceAmt}>{formatPrice(room.pricePerNight)}</span>
              <span className={styles.pricePer}>{rd.pricePerNight}</span>
            </div>

            <div className={styles.dateRow}>
              <div className={styles.dateField}>
                <label className={styles.fieldLabel}>{rd.checkInLabel}</label>
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
                <label className={styles.fieldLabel}>{rd.checkOutLabel}</label>
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
              <label className={styles.fieldLabel}>{rd.guestsLabel}</label>
              <select
                className={styles.fieldInput}
                value={booking.guests}
                onChange={(e) => dispatch(setGuests(Number(e.target.value)))}
              >
                {[...Array(Math.max(1, Number(room.maxGuests) || 1))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {rd.guests(i + 1)}
                  </option>
                ))}
              </select>
            </div>

            {totalNights > 0 && (
              <div className={styles.priceBreakdown}>
                <div className={styles.breakdownRow}>
                  <span>{rd.nightRate(formatPrice(room.pricePerNight))} ({rd.nights(totalNights)})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
                  <span>{t.booking.totalLabel}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            )}

            <motion.button
              className={styles.bookBtn}
              onClick={handleBook}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {room.available ? rd.bookBtn : rd.unavailBtn}
            </motion.button>

            <p className={styles.widgetNote}>{rd.taxNote}</p>
          </motion.aside>
        </div>
      </div>
    </PageWrapper>
  );
}
