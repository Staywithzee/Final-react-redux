import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useGetRoomByIdQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
} from '../rooms/roomsApi';
import { showNotification } from '../ui/uiSlice';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { staggerContainer, staggerItem } from '../../utils/transitions';
import styles from './RoomFormPage.module.css';

const CATEGORIES = ['Standard', 'Deluxe', 'Suite', 'Villa'];

const emptyForm = {
  name: '', category: 'Standard', pricePerNight: '', maxGuests: '',
  size: '', description: '', imageUrl: '', available: true,
};

function FormContent({ existingRoom, isEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addRoom, { isLoading: isAdding }] = useAddRoomMutation();
  const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation();

  const [form, setForm] = useState(() => {
    if (existingRoom) {
      return {
        name: existingRoom.name ?? '',
        category: existingRoom.category ?? 'Standard',
        pricePerNight: existingRoom.pricePerNight ?? '',
        maxGuests: existingRoom.maxGuests ?? '',
        size: existingRoom.size ?? '',
        description: existingRoom.description ?? '',
        imageUrl: existingRoom.imageUrl ?? '',
        available: existingRoom.available ?? true,
      };
    }
    return emptyForm;
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Room name is required.';
    if (!form.category) newErrors.category = 'Category is required.';
    if (!form.pricePerNight || Number(form.pricePerNight) <= 0)
      newErrors.pricePerNight = 'Price must be a positive number.';
    if (!form.maxGuests || Number(form.maxGuests) < 1)
      newErrors.maxGuests = 'At least 1 guest required.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...form,
      pricePerNight: Number(form.pricePerNight),
      maxGuests: Number(form.maxGuests),
      size: Number(form.size),
    };

    try {
      if (isEdit) {
        await updateRoom({ id: existingRoom.id, ...payload }).unwrap();
        dispatch(showNotification({ message: 'Room updated successfully.', type: 'success' }));
      } else {
        await addRoom(payload).unwrap();
        dispatch(showNotification({ message: 'Room added successfully.', type: 'success' }));
        setForm(emptyForm);
        setErrors({});
      }
      navigate(-1);
    } catch (err) {
      console.error('Add/Edit room error:', err);
      const msg = err?.data?.message || err?.error || `Error ${err?.status ?? ''}`.trim();
      dispatch(showNotification({ message: msg || 'Operation failed. Please try again.', type: 'error' }));
    }
  };

  const isPending = isAdding || isUpdating;

  const fields = [
    { id: 'name',         label: 'Room Name *',              type: 'text',   placeholder: 'e.g. Deluxe Garden Suite' },
    { id: 'pricePerNight',label: 'Price per Night (USD) *',  type: 'number', placeholder: 'e.g. 4500',  min: '1' },
    { id: 'maxGuests',    label: 'Max Guests *',              type: 'number', placeholder: 'e.g. 2',     min: '1' },
    { id: 'size',         label: 'Size (m²)',                 type: 'number', placeholder: 'e.g. 55',    min: '0' },
    { id: 'imageUrl',     label: 'Image URL',                 type: 'url',    placeholder: 'https://images.unsplash.com/...' },
  ];

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <motion.div
        className={styles.grid}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Category select */}
        <motion.div className={styles.fieldGroup} variants={staggerItem}>
          <label className={styles.label} htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
            value={form.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <AnimatePresence>
            {errors.category && (
              <motion.span className={styles.errorMsg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {errors.category}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {fields.map(({ id, label, type, placeholder, min }) => (
          <motion.div key={id} className={styles.fieldGroup} variants={staggerItem}>
            <label className={styles.label} htmlFor={id}>{label}</label>
            <motion.div animate={errors[id] ? { x: [0, -8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.4 }}>
              <input
                id={id}
                name={id}
                type={type}
                min={min}
                className={`${styles.input} ${errors[id] ? styles.inputError : ''}`}
                value={form[id]}
                onChange={handleChange}
                placeholder={placeholder}
              />
            </motion.div>
            <AnimatePresence>
              {errors[id] && (
                <motion.span className={styles.errorMsg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {errors[id]}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className={styles.fieldGroup} variants={staggerItem} initial="hidden" animate="visible">
        <label className={styles.label} htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the room, its ambiance, and what makes it special..."
          rows={4}
        />
      </motion.div>

      <motion.div className={styles.checkboxGroup} variants={staggerItem} initial="hidden" animate="visible">
        <input
          id="available"
          name="available"
          type="checkbox"
          className={styles.checkbox}
          checked={form.available}
          onChange={handleChange}
        />
        <label htmlFor="available" className={styles.checkboxLabel}>
          Room is available for booking
        </label>
      </motion.div>

      <div className={styles.formActions}>
        <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)} disabled={isPending}>
          Cancel
        </button>
        <motion.button
          type="submit"
          className={styles.submitBtn}
          disabled={isPending}
          whileHover={{ scale: isPending ? 1 : 1.02 }}
          whileTap={{ scale: isPending ? 1 : 0.98 }}
        >
          {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Room'}
        </motion.button>
      </div>
    </form>
  );
}

export default function RoomFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { data: existingRoom, isLoading, isError } = useGetRoomByIdQuery(id, { skip: !isEdit });

  return (
    <PageWrapper>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Administration</p>
            <h1 className={styles.title}>{isEdit ? 'Edit Room' : 'Add New Room'}</h1>
          </div>

          {isEdit && isLoading ? (
            <div className={styles.loadingWrap}>
              <div className={styles.spinner} />
            </div>
          ) : isEdit && isError ? (
            <ErrorMessage message="Room not found." />
          ) : (
            <FormContent
              key={existingRoom?.id ?? 'new'}
              existingRoom={isEdit ? existingRoom : null}
              isEdit={isEdit}
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
