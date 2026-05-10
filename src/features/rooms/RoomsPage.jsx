import { useSelector, useDispatch } from 'react-redux';
import { useGetRoomsQuery } from './roomsApi';
import { selectFilteredRooms } from './roomsSelectors';
import { setSearchQuery, setActiveCategory } from '../ui/uiSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageWrapper } from '../../components/PageWrapper/PageWrapper';
import { AccordionPanels } from '../../components/AccordionPanels/AccordionPanels';
import { RoomListItem } from '../../components/RoomListItem/RoomListItem';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './RoomsPage.module.css';

// Internal category keys — used for filtering logic (never translated)
const CATEGORY_KEYS = ['All', 'Suite', 'Deluxe', 'Standard', 'Villa'];

export default function RoomsPage() {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const r = t.rooms;

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
            <p className={styles.eyebrow}>{r.eyebrow}</p>
            <h1 className={styles.title}>{r.title}</h1>
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
            <h1 className={styles.title}>{r.title}</h1>
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
            <p className={styles.eyebrow}>{r.eyebrow}</p>
            <h1 className={styles.title}>{r.title}</h1>
          </div>
          <AccordionPanels panels={r.panels} />
        </div>

        {/* Filter + search controls */}
        <div className={styles.controls}>
          <div className={styles.filters}>
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                className={`${styles.filterBtn} ${activeCategory === key ? styles.filterActive : ''}`}
                onClick={() => dispatch(setActiveCategory(key))}
              >
                {activeCategory === key && (
                  <motion.span layoutId="activeTab" className={styles.tabIndicator} />
                )}
                <span className={styles.filterLabel}>{r.categoryLabels[key]}</span>
              </button>
            ))}
          </div>

          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder={r.searchPlaceholder}
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
            <p className={styles.emptyText}>{r.noResults}</p>
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
