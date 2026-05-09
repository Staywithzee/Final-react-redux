import { Link } from 'react-router-dom';
import { useGetRoomsQuery } from '../features/rooms/roomsApi';
import RoomCard from '../components/RoomCard/RoomCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import styles from './HomePage.module.css';

const features = [
  { icon: '🍽', title: 'Fine Dining', desc: 'Michelin-starred cuisine by our executive chef' },
  { icon: '✦', title: 'Spa & Wellness', desc: 'Rejuvenate in our award-winning sanctuary' },
  { icon: '◇', title: 'Infinity Pool', desc: 'Panoramic views over the cityscape' },
  { icon: '❧', title: 'Concierge', desc: 'Personalised service around the clock' },
];

const testimonials = [
  {
    id: 1,
    name: 'Isabelle Moreau',
    role: 'Paris, France',
    quote:
      'An unparalleled experience — every detail, from the crisp linens to the morning light flooding our suite, was perfection.',
  },
  {
    id: 2,
    name: 'James Whitfield',
    role: 'London, UK',
    quote:
      'Lumière redefines what a luxury hotel can be. The staff anticipate your every need before you even realise it yourself.',
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Hong Kong',
    quote:
      'The infinity pool at sunset is a memory I will carry forever. An exquisite retreat in every sense of the word.',
  },
];

export default function HomePage() {
  const { data: rooms, isLoading } = useGetRoomsQuery();
  const featured = rooms ? rooms.slice(0, 3) : [];

  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Established 1924 · Paris</p>
          <h1 className={styles.heroTitle}>LUMIÈRE</h1>
          <p className={styles.heroSubtitle}>Where timeless elegance meets modern refinement</p>
          <div className={styles.heroCtas}>
            <Link to="/rooms" className={styles.ctaPrimary}>
              Explore Rooms
            </Link>
            <Link to="/booking" className={styles.ctaSecondary}>
              Book Now
            </Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          {features.map((f) => (
            <div key={f.title} className={styles.feature}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className={styles.roomsPreview}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Accommodations</p>
          <h2 className={styles.sectionTitle}>Our Curated Rooms & Suites</h2>
          <p className={styles.sectionSub}>
            Each room is a testament to refined taste — handcrafted furniture, bespoke textiles,
            and a view worth waking up for.
          </p>
        </div>
        <div className={styles.grid}>
          {isLoading
            ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            : featured.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
        <div className={styles.viewAll}>
          <Link to="/rooms" className={styles.viewAllBtn}>
            View All Rooms
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.about}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <p className={styles.eyebrow}>Our Story</p>
            <h2 className={styles.aboutTitle}>A Century of Gracious Hospitality</h2>
            <p className={styles.aboutBody}>
              Founded in 1924, Lumière has welcomed artists, diplomats, and discerning travellers
              for over a century. Our philosophy is simple: every guest deserves an experience that
              transcends accommodation and becomes a cherished memory.
            </p>
            <p className={styles.aboutBody}>
              The hotel blends Haussmann grandeur with contemporary comfort — original gilded
              mouldings alongside state-of-the-art amenities, ensuring your stay is both timeless
              and flawless.
            </p>
            <Link to="/rooms" className={styles.aboutCta}>
              Discover Our Rooms
            </Link>
          </div>
          <div className={styles.aboutVisual}>
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
              alt="Lumière Hotel Interior"
              className={styles.aboutImg}
            />
            <div className={styles.aboutAccent} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Guest Experiences</p>
          <h2 className={styles.sectionTitle}>What Our Guests Say</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <blockquote key={t.id} className={styles.quote}>
              <p className={styles.quoteText}>"{t.quote}"</p>
              <footer className={styles.quoteAuthor}>
                <span className={styles.quoteName}>{t.name}</span>
                <span className={styles.quoteRole}>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <p className={styles.eyebrow}>Reservations</p>
          <h2 className={styles.ctaBannerTitle}>Reserve Your Stay</h2>
          <p className={styles.ctaBannerSub}>
            From intimate getaways to grand celebrations — let us craft your perfect stay.
          </p>
          <Link to="/booking" className={styles.ctaBannerBtn}>
            Begin Your Journey
          </Link>
        </div>
      </section>
    </main>
  );
}
