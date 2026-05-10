import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { showNotification } from '../features/ui/uiSlice';
import { PageWrapper } from '../components/PageWrapper/PageWrapper';
import { Reveal } from '../components/Reveal/Reveal';
import { ParallaxImage } from '../components/ParallaxImage/ParallaxImage';
import { AccordionPanels } from '../components/AccordionPanels/AccordionPanels';
import { slideLeft, slideRight } from '../utils/transitions';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './DiningPage.module.css';

const diningPanels = [
  {
    id: 'fine-dining',
    tab: 'Fine Dining',
    title: 'THE LUMIÈRE TABLE',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    exploreLink: '/dining',
  },
  {
    id: 'rooftop',
    tab: 'Rooftop Bar',
    title: 'TERRASSE SKY LOUNGE',
    imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&q=80',
    exploreLink: '/dining',
  },
  {
    id: 'breakfast',
    tab: 'Breakfast',
    title: 'MORNING TABLE',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    exploreLink: '/dining',
  },
  {
    id: 'private',
    tab: 'Private Events',
    title: 'EXCLUSIVE DINING',
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
    exploreLink: '/dining',
  },
];

const restaurants = [
  {
    id: 1,
    name: 'Le Lumière',
    type: 'Fine Dining · French Cuisine',
    hours: 'Dinner: 18:30 – 22:30 · Closed Mondays',
    description:
      'Our flagship restaurant, helmed by Executive Chef Étienne Bellard, presents a symphony of contemporary French gastronomy. Each dish tells a story of provenance and precision — a Michelin experience that begins with the first glance at the menu.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    tags: ['Michelin Star', 'Tasting Menu', 'Wine Pairing', 'Private Dining'],
    dresscode: 'Smart Elegant',
  },
  {
    id: 2,
    name: 'Terrasse',
    type: 'Rooftop Bar & Lounge',
    hours: 'Daily: 17:00 – 01:00',
    description:
      'Perched on the 12th floor with panoramic city views, Terrasse is where golden hour lingers longest. Sip handcrafted cocktails as the city transitions from day to night — an intimate experience for two or a sophisticated gathering for many.',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80',
    tags: ['Cocktail Bar', 'Panoramic Views', 'Live Jazz Thursdays', 'Small Plates'],
    dresscode: 'Smart Casual',
  },
];

function RestaurantCard({ r, reversed }) {
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
          <span className={styles.dresscode}>Dress Code: {r.dresscode}</span>
        </div>
        <motion.button
          className={styles.reserveBtn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {}}
        >
          Reserve a Table
        </motion.button>
      </motion.div>
    </article>
  );
}

export default function DiningPage() {
  const dispatch = useDispatch();

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
              <p className={styles.eyebrow}>Culinary Arts</p>
            </Reveal>
            <Reveal delay={0.25}>
              <h1 className={styles.heroTitle}>The Lumière Table</h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className={styles.heroSub}>
                Where French culinary heritage meets contemporary artistry
              </p>
            </Reveal>
          </div>
        </section>

        {/* Intro */}
        <section className={styles.intro}>
          <Reveal>
            <div className={styles.introInner}>
              <p className={styles.introText}>
                At Lumière, dining is not merely sustenance — it is ceremony. Our culinary team
                sources the finest seasonal ingredients from local artisan producers, transforming
                them into edible poetry with classical technique and modern imagination.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Dining accordion */}
        <AccordionPanels panels={diningPanels} />

        {/* Restaurants */}
        <section className={styles.restaurants}>
          <div className={styles.restaurantsInner}>
            {restaurants.map((r, i) => (
              <RestaurantCard key={r.id} r={r} reversed={i % 2 !== 0} onReserve={handleReserve} />
            ))}
          </div>
        </section>

        {/* Amenities bar */}
        <section className={styles.amenities}>
          <Reveal>
            <div className={styles.amenitiesInner}>
              {["In-Room Dining", "Chef's Table", 'Private Events', 'Sommelier Service'].map((item) => (
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
