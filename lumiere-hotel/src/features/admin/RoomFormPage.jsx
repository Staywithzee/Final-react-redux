import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useGetRoomByIdQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
} from '../rooms/roomsApi';
import { showNotification } from '../ui/uiSlice';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './RoomFormPage.module.css';

const CATEGORIES = ['Standard', 'Deluxe', 'Suite', 'Villa'];

const emptyForm = {
  name: '',
  category: 'Standard',
  pricePerNight: '',
  maxGuests: '',
  size: '',
  description: '',
  imageUrl: '',
  available: true,
};

// Renders the actual form once data is available
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
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
      }
      navigate(-1);
    } catch (err) {
      console.error('Add/Edit room error:', err);
      const msg = err?.data?.message || err?.error || `Error ${err?.status ?? ''}`.trim();
      dispatch(showNotification({ message: msg || 'Operation failed. Please try again.', type: 'error' }));
    }
  };

  const isPending = isAdding || isUpdating;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="name">Room Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Deluxe Garden Suite"
          />
          {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            className={`${styles.input} ${errors.category ? styles.inputError : ''}`}
            value={form.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <span className={styles.errorMsg}>{errors.category}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="pricePerNight">Price per Night (USD) *</label>
          <input
            id="pricePerNight"
            name="pricePerNight"
            type="number"
            min="1"
            className={`${styles.input} ${errors.pricePerNight ? styles.inputError : ''}`}
            value={form.pricePerNight}
            onChange={handleChange}
            placeholder="e.g. 4500"
          />
          {errors.pricePerNight && (
            <span className={styles.errorMsg}>{errors.pricePerNight}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="maxGuests">Max Guests *</label>
          <input
            id="maxGuests"
            name="maxGuests"
            type="number"
            min="1"
            className={`${styles.input} ${errors.maxGuests ? styles.inputError : ''}`}
            value={form.maxGuests}
            onChange={handleChange}
            placeholder="e.g. 2"
          />
          {errors.maxGuests && <span className={styles.errorMsg}>{errors.maxGuests}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="size">Size (m²)</label>
          <input
            id="size"
            name="size"
            type="number"
            min="0"
            className={styles.input}
            value={form.size}
            onChange={handleChange}
            placeholder="e.g. 55"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            className={styles.input}
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
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
      </div>

      <div className={styles.checkboxGroup}>
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
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => navigate(-1)}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Room'}
        </button>
      </div>
    </form>
  );
}

export default function RoomFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { data: existingRoom, isLoading, isError } = useGetRoomByIdQuery(id, {
    skip: !isEdit,
  });

  return (
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
          // Key forces remount so useState initializer picks up existingRoom
          <FormContent
            key={existingRoom?.id ?? 'new'}
            existingRoom={isEdit ? existingRoom : null}
            isEdit={isEdit}
          />
        )}
      </div>
    </div>
  );
}
