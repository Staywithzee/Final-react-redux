import { useSelector, useDispatch } from 'react-redux';
import { useGetRoomsQuery } from './roomsApi';
import { selectFilteredRooms } from './roomsSelectors';
import { setSearchQuery, setActiveCategory } from '../ui/uiSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { Reveal } from '../../components/Reveal/Reveal';
import RoomCard from '../../components/RoomCard/RoomCard';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { staggerItem } from '../../utils/transitions';
import styles from './RoomsPage.module.css';

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
      <PageWrapper>
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
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <div className={styles.page}>
          <div className={styles.header}>
            <h1 className={styles.title}>Rooms & Suites</h1>
          </div>
          <ErrorMessage message={error?.data?.message ?? 'Unable to load rooms. Please try again.'} />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className={styles.page}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Accommodations</p>
            <h1 className={styles.title}>Rooms & Suites</h1>
            <p className={styles.subtitle}>
              Choose from our carefully curated collection of rooms and suites
            </p>
          </div>
        </Reveal>

        <div className={styles.controls}>
          <div className={styles.filters}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => dispatch(setActiveCategory(cat))}
              >
                {activeCategory === cat && (
                  <motion.span layoutId="activeTab" className={styles.tabIndicator} />
                )}
                <span className={styles.filterLabel}>{cat}</span>
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
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className={styles.emptyText}>No rooms match your current search or filter.</p>
          </motion.div>
        ) : (
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filteredRooms.map((room) => (
                <motion.div
                  key={room.id}
                  layout
                  variants={staggerItem}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
}
