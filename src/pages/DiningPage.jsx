import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { showNotification } from '../features/ui/uiSlice';
import { useLanguage } from '../context/LanguageContext';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import { Reveal } from '../components/Reveal/Reveal';
import { ParallaxImage } from '../components/ParallaxImage/ParallaxImage';
import { AccordionPanels } from '../components/AccordionPanels/AccordionPanels';
import { slideLeft, slideRight } from '../utils/transitions';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './DiningPage.module.css';

function RestaurantCard({ r, reversed, onReserve, reserveLabel, dressCodeLabel }) {
  const { ref: textRef, isInView: textInView } = useScrollReveal();
  const { ref: imgRef, isInView: imgInView } = useScrollReveal();

  return (
    <article className={`${styles.restaurant} ${reversed ? styles.reversed : ''}`}>
      <motion.div
        ref={imgRef}
        className={styles.restImageWrap}
        variants={reversed ? slideRight : slideLeft}
        initial="hidden"
        animate={imgInView ? 'visible' : 'hidden'}
      >
        <ParallaxImage src={r.image} alt={r.name} speed={0.1} />
      </motion.div>

      <motion.div
        ref={textRef}
        className={styles.restContent}
        variants={reversed ? slideLeft : slideRight}
        initial="hidden"
        animate={textInView ? 'visible' : 'hidden'}
      >
        <p className={styles.restType}>{r.type}</p>
        <h2 className={styles.restName}>{r.name}</h2>
        <p className={styles.restDesc}>{r.description}</p>
        <p className={styles.restHours}>{r.hours}</p>
        <div className={styles.tags}>
          {r.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.restMeta}>
          <span className={styles.dresscode}>{dressCodeLabel}: {r.dresscode}</span>
        </div>
        <motion.button
          className={styles.reserveBtn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onReserve(r.name)}
        >
          {reserveLabel}
        </motion.button>
      </motion.div>
    </article>
  );
}

export default function DiningPage() {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const d = t.dining;

  const handleReserve = (name) => {
    dispatch(showNotification({
      message: `Reservation request sent for ${name}. We will confirm shortly.`,
      type: 'success',
    }));
  };

  return (
    <PageWrapper>
      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <Reveal delay={0.1}>
              <p className={styles.eyebrow}>{d.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.25}>
              <h1 className={styles.heroTitle}>{d.title}</h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className={styles.heroSub}>{d.sub}</p>
            </Reveal>
          </div>
        </section>

        {/* Intro */}
        <section className={styles.intro}>
          <Reveal>
            <div className={styles.introInner}>
              <p className={styles.introText}>{d.intro}</p>
            </div>
          </Reveal>
        </section>

        {/* Dining accordion */}
        <AccordionPanels panels={d.panels} />

        {/* Restaurants */}
        <section className={styles.restaurants}>
          <div className={styles.restaurantsInner}>
            {d.restaurants.map((r, i) => (
              <RestaurantCard
                key={r.id}
                r={r}
                reversed={i % 2 !== 0}
                onReserve={handleReserve}
                reserveLabel={d.reserveBtn}
                dressCodeLabel={d.dressCode}
              />
            ))}
          </div>
        </section>

        {/* Amenities bar */}
        <section className={styles.amenities}>
          <Reveal>
            <div className={styles.amenitiesInner}>
              {d.amenities.map((item) => (
                <div key={item} className={styles.amenityItem}>
                  <span className={styles.amenityTitle}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </PageWrapper>
  );
}
