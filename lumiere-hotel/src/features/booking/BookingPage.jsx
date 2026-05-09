import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clearBooking } from './bookingSlice';
import { showNotification } from '../ui/uiSlice';
import { selectTotalNights, selectTotalPrice } from './bookingSelectors';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { slideLeft, slideRight, staggerContainer, staggerItem } from '../../utils/transitions';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './BookingPage.module.css';

export default function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const booking = useSelector((state) => state.booking);
  const totalNights = useSelector(selectTotalNights);
  const totalPrice = useSelector(selectTotalPrice);

  const [form, setForm] = useState({ fullName: '', email: '', phone: '', specialRequests: '' });
  const [errors, setErrors] = useState({});

  const { ref: summaryRef, isInView: summaryInView } = useScrollReveal();
  const { ref: formRef, isInView: formInView } = useScrollReveal();

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!form.email.includes('@')) newErrors.email = 'Please enter a valid email address.';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    dispatch(clearBooking());
    dispatch(showNotification({ message: 'Booking confirmed! We look forward to welcoming you.', type: 'success' }));
    navigate('/');
  };

  if (!booking.selectedRoom) {
    return (
      <PageWrapper>
        <div className={styles.page}>
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={styles.emptyTitle}>No Room Selected</h2>
            <p className={styles.emptyText}>
              Please browse our rooms and select one before proceeding to booking.
            </p>
            <Link to="/rooms" className={styles.emptyBtn}>Browse Rooms</Link>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className={styles.page}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Reservations</p>
          <h1 className={styles.title}>Complete Your Booking</h1>
        </div>

        <div className={styles.layout}>
          {/* LEFT: Summary */}
          <motion.div
            ref={summaryRef}
            className={styles.summary}
            variants={slideLeft}
            initial="hidden"
            animate={summaryInView ? 'visible' : 'hidden'}
          >
            <h2 className={styles.summaryTitle}>Booking Summary</h2>

            <div className={styles.summaryRoom}>
              <img
                src={booking.selectedRoom.imageUrl}
                alt={booking.selectedRoom.name}
                className={styles.summaryImg}
              />
              <div className={styles.summaryRoomInfo}>
                <span className={styles.summaryCategory}>{booking.selectedRoom.category}</span>
                <h3 className={styles.summaryRoomName}>{booking.selectedRoom.name}</h3>
              </div>
            </div>

            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Check-In</span>
                <span className={styles.summaryValue}>
                  {booking.checkIn || <span className={styles.na}>Not set</span>}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Check-Out</span>
                <span className={styles.summaryValue}>
                  {booking.checkOut || <span className={styles.na}>Not set</span>}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Guests</span>
                <span className={styles.summaryValue}>{booking.guests}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Nights</span>
                <span className={styles.summaryValue}>{totalNights}</span>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalAmount}>
                {totalPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.form
            ref={formRef}
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            variants={slideRight}
            initial="hidden"
            animate={formInView ? 'visible' : 'hidden'}
          >
            <h2 className={styles.formTitle}>Guest Information</h2>

            <motion.div
              className={styles.fieldGroup}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                { id: 'fullName', label: 'Full Name *',       type: 'text',  placeholder: 'Your full name' },
                { id: 'email',    label: 'Email Address *',   type: 'email', placeholder: 'your@email.com' },
                { id: 'phone',    label: 'Phone Number *',    type: 'tel',   placeholder: '+1 (555) 000-0000' },
              ].map(({ id, label, type, placeholder }) => (
                <motion.div key={id} className={styles.fieldItem} variants={staggerItem}>
                  <label className={styles.label} htmlFor={id}>{label}</label>
                  <motion.div
                    animate={errors[id] ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      id={id}
                      name={id}
                      type={type}
                      className={`${styles.input} ${errors[id] ? styles.inputError : ''}`}
                      value={form[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {errors[id] && (
                      <motion.span
                        className={styles.errorMsg}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        {errors[id]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div className={styles.fieldItem} variants={staggerItem}>
                <label className={styles.label} htmlFor="specialRequests">Special Requests</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  className={styles.textarea}
                  value={form.specialRequests}
                  onChange={handleChange}
                  placeholder="Any dietary requirements, room preferences, or special occasions..."
                  rows={4}
                />
              </motion.div>
            </motion.div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirm Reservation
            </motion.button>

            <p className={styles.note}>
              By confirming, you agree to our cancellation policy. A confirmation will be sent to
              your email.
            </p>
          </motion.form>
        </div>
      </div>
    </PageWrapper>
  );
}
