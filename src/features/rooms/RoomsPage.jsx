import { useSelector, useDispatch } from 'react-redux';
import { useGetRoomsQuery } from './roomsApi';
import { selectFilteredRooms } from './roomsSelectors';
import { setSearchQuery, setActiveCategory } from '../ui/uiSlice';
import { useDebounce } from '../../hooks/useDebounce';
import RoomCard from '../../components/RoomCard/RoomCard';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './RoomsPage.module.css';
import { useState, useEffect } from 'react';

const CATEGORIES = ['All', 'Suite', 'Deluxe', 'Standard', 'Villa'];

export default function RoomsPage() {
  const dispatch = useDispatch();
  const { isLoading, isError, error } = useGetRoomsQuery();
  const filteredRooms = useSelector(selectFilteredRooms);
  const searchQuery = useSelector((state) => state.ui.searchQuery);
  const activeCategory = useSelector((state) => state.ui.activeCategory);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Accommodations</p>
          <h1 className={styles.title}>Rooms & Suites</h1>
        </div>
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Rooms & Suites</h1>
        </div>
        <ErrorMessage message={error?.data?.message ?? 'Unable to load rooms. Please try again.'} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Accommodations</p>
        <h1 className={styles.title}>Rooms & Suites</h1>
        <p className={styles.subtitle}>
          Choose from our carefully curated collection of rooms and suites
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => dispatch(setActiveCategory(cat))}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="Search rooms..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className={styles.search}
          />
        </div>
      </div>

      {filteredRooms.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>No rooms match your current search or filter.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
