import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearBooking } from './bookingSlice';
import { showNotification } from '../ui/uiSlice';
import { selectTotalNights, selectTotalPrice } from './bookingSelectors';
import styles from './BookingPage.module.css';

export default function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const booking = useSelector((state) => state.booking);
  const totalNights = useSelector(selectTotalNights);
  const totalPrice = useSelector(selectTotalPrice);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});

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
      <div className={styles.page}>
        <div className={styles.empty}>
          <h2 className={styles.emptyTitle}>No Room Selected</h2>
          <p className={styles.emptyText}>
            Please browse our rooms and select one before proceeding to booking.
          </p>
          <Link to="/rooms" className={styles.emptyBtn}>
            Browse Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Reservations</p>
        <h1 className={styles.title}>Complete Your Booking</h1>
      </div>

      <div className={styles.layout}>
        {/* LEFT: Summary */}
        <div className={styles.summary}>
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
        </div>

        {/* RIGHT: Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.formTitle}>Guest Information</h2>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
            />
            {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
            {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
          </div>

          <div className={styles.fieldGroup}>
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
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirm Reservation
          </button>

          <p className={styles.note}>
            By confirming, you agree to our cancellation policy. A confirmation will be sent to your
            email.
          </p>
        </form>
      </div>
    </div>
  );
}
