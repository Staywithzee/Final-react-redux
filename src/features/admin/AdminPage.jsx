import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetRoomsQuery, useDeleteRoomMutation } from '../rooms/roomsApi';
import { showNotification } from '../ui/uiSlice';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import styles from './AdminPage.module.css';

const rowVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, x: -24, transition: { duration: 0.25 } },
};

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
    <PageWrapper>
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
                <AnimatePresence>
                  {(rooms ?? []).map((room, i) => (
                    <motion.tr
                      key={room.id}
                      className={styles.tr}
                      custom={i}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
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
                          <AnimatePresence mode="wait">
                            {confirmId === room.id ? (
                              <motion.div
                                key="confirm"
                                className={styles.confirmWrap}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                              >
                                <span className={styles.confirmText}>Confirm?</span>
                                <button className={styles.confirmYes} onClick={() => handleDelete(room.id)}>Yes</button>
                                <button className={styles.confirmNo} onClick={() => setConfirmId(null)}>No</button>
                              </motion.div>
                            ) : (
                              <motion.button
                                key="delete"
                                className={styles.deleteBtn}
                                onClick={() => setConfirmId(room.id)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                Delete
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
