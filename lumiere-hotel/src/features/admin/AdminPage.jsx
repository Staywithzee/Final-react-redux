import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetRoomsQuery, useDeleteRoomMutation } from '../rooms/roomsApi';
import { showNotification } from '../ui/uiSlice';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './AdminPage.module.css';

export default function AdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: rooms, isLoading, isError, error } = useGetRoomsQuery();
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteRoom(id).unwrap();
      dispatch(showNotification({ message: 'Room deleted successfully.', type: 'success' }));
    } catch {
      dispatch(showNotification({ message: 'Failed to delete room.', type: 'error' }));
    }
    setConfirmId(null);
  };

  return (
    <div className={styles.page}>
      {isDeleting && (
        <div className={styles.overlay}>
          <div className={styles.spinner} />
        </div>
      )}

      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Administration</p>
          <h1 className={styles.title}>Room Management</h1>
        </div>
        <button className={styles.addBtn} onClick={() => navigate('/admin/rooms/new')}>
          + Add Room
        </button>
      </div>

      {isLoading ? (
        <div className={styles.skeletonGrid}>
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorMessage message={error?.data?.message ?? 'Unable to load rooms.'} />
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Room</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Price/Night</th>
                <th className={styles.th}>Guests</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.roomCell}>
                      <img src={room.imageUrl} alt={room.name} className={styles.thumb} />
                      <span className={styles.roomName}>{room.name}</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.category}>{room.category}</span>
                  </td>
                  <td className={styles.td}>
                    {Number(room.pricePerNight).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className={styles.td}>{room.maxGuests}</td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.badge} ${room.available ? styles.available : styles.unavailable}`}
                    >
                      {room.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => navigate(`/admin/rooms/${room.id}/edit`)}
                      >
                        Edit
                      </button>
                      {confirmId === room.id ? (
                        <div className={styles.confirmWrap}>
                          <span className={styles.confirmText}>Confirm?</span>
                          <button
                            className={styles.confirmYes}
                            onClick={() => handleDelete(room.id)}
                          >
                            Yes
                          </button>
                          <button
                            className={styles.confirmNo}
                            onClick={() => setConfirmId(null)}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          className={styles.deleteBtn}
                          onClick={() => setConfirmId(room.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
