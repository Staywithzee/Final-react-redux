import { useSelector, useDispatch } from 'react-redux';
import { useGetRoomsQuery } from './roomsApi';
import { selectFilteredRooms } from './roomsSelectors';
import { setSearchQuery, setActiveCategory } from '../ui/uiSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { AccordionPanels } from '../../components/AccordionPanels/AccordionPanels';
import { RoomListItem } from '../../components/RoomListItem/RoomListItem';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './RoomsPage.module.css';

const CATEGORIES = ['All', 'Suite', 'Deluxe', 'Standard', 'Villa'];

const roomCategoryPanels = [
  {
    id: 'suite',
    tab: 'Suite',
    title: 'LUMIÈRE SUITE',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
    exploreLink: '/rooms',
  },
  {
    id: 'deluxe',
    tab: 'Deluxe',
    title: 'DELUXE ROOM',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    exploreLink: '/rooms',
  },
  {
    id: 'villa',
    tab: 'Villa',
    title: 'PRIVATE VILLA',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    exploreLink: '/rooms',
  },
  {
    id: 'standard',
    tab: 'Standard',
    title: 'CLASSIC ROOM',
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
    exploreLink: '/rooms',
  },
];

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
          <div className={styles.skeletonList}>
            {[...Array(4)].map((_, i) => (
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
        {/* Category showcase accordion */}
        <div className={styles.accordionSection}>
          <div className={styles.accordionHeader}>
            <p className={styles.eyebrow}>Accommodations</p>
            <h1 className={styles.title}>Rooms & Suites</h1>
          </div>
          <AccordionPanels panels={roomCategoryPanels} />
        </div>

        {/* Filter + search controls */}
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

        {/* Room list */}
        {filteredRooms.length === 0 ? (
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className={styles.emptyText}>No rooms match your current search or filter.</p>
          </motion.div>
        ) : (
          <div className={styles.list}>
            <AnimatePresence mode="wait">
              {filteredRooms.map((room, i) => (
                <RoomListItem key={room.id} room={room} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
