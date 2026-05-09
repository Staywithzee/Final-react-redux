import { useDispatch } from 'react-redux';
import { showNotification } from '../features/ui/uiSlice';
import styles from './DiningPage.module.css';

const restaurants = [
  {
    id: 1,
    name: 'Le Lumière',
    type: 'Fine Dining · French Cuisine',
    hours: 'Dinner: 18:30 – 22:30 · Closed Mondays',
    description:
      'Our flagship restaurant, helmed by Executive Chef Étienne Bellard, presents a symphony of contemporary French gastronomy. Each dish tells a story of provenance and precision — a Michelin experience that begins with the first glance at the menu.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80',
    tags: ['Cocktail Bar', 'Panoramic Views', 'Live Jazz Thursdays', 'Small Plates'],
    dresscode: 'Smart Casual',
  },
];

export default function DiningPage() {
  const dispatch = useDispatch();

  const handleReserve = (name) => {
    dispatch(showNotification({ message: `Reservation request sent for ${name}. We will confirm shortly.`, type: 'success' }));
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Culinary Arts</p>
          <h1 className={styles.heroTitle}>The Lumière Table</h1>
          <p className={styles.heroSub}>
            Where French culinary heritage meets contemporary artistry
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <p className={styles.introText}>
            At Lumière, dining is not merely sustenance — it is ceremony. Our culinary team
            sources the finest seasonal ingredients from local artisan producers, transforming
            them into edible poetry with classical technique and modern imagination.
          </p>
        </div>
      </section>

      {/* Restaurants */}
      <section className={styles.restaurants}>
        <div className={styles.restaurantsInner}>
          {restaurants.map((r, i) => (
            <article
              key={r.id}
              className={`${styles.restaurant} ${i % 2 !== 0 ? styles.reversed : ''}`}
            >
              <div className={styles.restImageWrap}>
                <img src={r.image} alt={r.name} className={styles.restImage} />
              </div>
              <div className={styles.restContent}>
                <p className={styles.restType}>{r.type}</p>
                <h2 className={styles.restName}>{r.name}</h2>
                <p className={styles.restDesc}>{r.description}</p>
                <p className={styles.restHours}>{r.hours}</p>
                <div className={styles.tags}>
                  {r.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.restMeta}>
                  <span className={styles.dresscode}>Dress Code: {r.dresscode}</span>
                </div>
                <button className={styles.reserveBtn} onClick={() => handleReserve(r.name)}>
                  Reserve a Table
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Amenities bar */}
      <section className={styles.amenities}>
        <div className={styles.amenitiesInner}>
          {['In-Room Dining', 'Chef\'s Table', 'Private Events', 'Sommelier Service'].map((item) => (
            <div key={item} className={styles.amenityItem}>
              <span className={styles.amenityTitle}>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
