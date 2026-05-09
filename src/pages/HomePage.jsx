import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { useGetRoomsQuery } from '../features/rooms/roomsApi';
import RoomCard from '../components/RoomCard/RoomCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import styles from './HomePage.module.css';

// ─── Variants ────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

const testimonialVariants = {
  hidden: { opacity: 0, y: 80, rotate: 2 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: 'easeOut' },
  }),
};

// ─── Static Data ──────────────────────────────────────────────────────────────

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

// ─── Helper Components ────────────────────────────────────────────────────────

function AnimatedCounter({ to, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = to / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return (
    <div ref={ref} className={styles.counter}>
      <span className={styles.counterNum}>{count}</span>
      <p className={styles.counterLabel}>{label}</p>
    </div>
  );
}

function MagneticButton({ children, to }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.05 }}
      className={styles.magneticWrap}
    >
      <Link to={to} className={styles.ctaBannerBtn}>
        {children}
      </Link>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const { data: rooms, isLoading } = useGetRoomsQuery();
  const featured = rooms ? rooms.slice(0, 3) : [];

  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Global scroll tracking
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Hero parallax background
  const heroY = useTransform(scrollY, [0, 800], prefersReduced ? [0, 0] : [0, -180]);

  // Section view refs
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' });

  const roomsHeadRef = useRef(null);
  const roomsHeadInView = useInView(roomsHeadRef, { once: true, margin: '-80px' });

  const roomsGridRef = useRef(null);
  const roomsGridInView = useInView(roomsGridRef, { once: true, margin: '-60px' });

  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-80px' });

  // About image scroll parallax
  const aboutImageRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutImageRef,
    offset: ['start end', 'end start'],
  });
  const aboutImgY = useTransform(
    aboutScroll,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['-8%', '8%']
  );

  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-60px' });

  // Testimonials watermark parallax
  const { scrollYProgress: testimonialScroll } = useScroll({
    target: testimonialsRef,
    offset: ['start end', 'end start'],
  });
  const watermarkX = useTransform(
    testimonialScroll,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['-4%', '4%']
  );

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div className={styles.progressBar} style={{ scaleX }} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className={styles.hero}>
          {/* Parallax background layer */}
          <motion.div className={styles.heroBg} style={{ y: heroY }} />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <motion.p
              className={styles.heroEyebrow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Established 1924 · Paris
            </motion.p>

            {/* Character-split title */}
            <h1 className={styles.heroTitle}>
              {'LUMIÈRE'.split('').map((char, i) => (
                <span key={i} className={styles.heroTitleClip}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4 + i * 0.07,
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Where timeless elegance meets modern refinement
            </motion.p>

            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Link to="/rooms" className={styles.ctaPrimary}>
                Explore Rooms
              </Link>
              <Link to="/booking" className={styles.ctaSecondary}>
                Book Now
              </Link>
            </motion.div>
          </div>

          {/* Bouncing scroll indicator */}
          <motion.div
            className={styles.heroScroll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.span
              className={styles.scrollLine}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className={styles.scrollLabel}>Scroll</span>
          </motion.div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────── */}
        <section className={styles.features}>
          <motion.div
            ref={featuresRef}
            className={styles.featuresInner}
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                className={styles.feature}
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                <motion.span
                  className={styles.featureIcon}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                >
                  {f.icon}
                </motion.span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
                <motion.span
                  className={styles.featureUnderline}
                  initial={{ width: 0 }}
                  whileHover={{ width: 40 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── ROOMS PREVIEW ────────────────────────────────────────────── */}
        <section className={styles.roomsPreview}>
          <div ref={roomsHeadRef} className={styles.sectionHead}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, x: -20 }}
              animate={roomsHeadInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Accommodations
            </motion.p>
            <div className={styles.clipWrap}>
              <motion.h2
                className={styles.sectionTitle}
                initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                animate={
                  roomsHeadInView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}
                }
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                Our Curated Rooms & Suites
              </motion.h2>
            </div>
            <motion.p
              className={styles.sectionSub}
              initial={{ opacity: 0, y: 20 }}
              animate={roomsHeadInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Each room is a testament to refined taste — handcrafted furniture, bespoke
              textiles, and a view worth waking up for.
            </motion.p>
          </div>

          <motion.div
            ref={roomsGridRef}
            className={styles.grid}
            initial="hidden"
            animate={roomsGridInView ? 'visible' : 'hidden'}
          >
            {isLoading
              ? [...Array(3)].map((_, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <SkeletonCard />
                  </motion.div>
                ))
              : featured.map((room, i) => (
                  <motion.div key={room.id} custom={i} variants={cardVariants}>
                    <RoomCard room={room} />
                  </motion.div>
                ))}
          </motion.div>

          <motion.div
            className={styles.viewAll}
            initial={{ opacity: 0, y: 20 }}
            animate={roomsGridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/rooms" className={styles.viewAllBtn}>
              View All Rooms
            </Link>
          </motion.div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────── */}
        <section className={styles.about} ref={aboutRef}>
          <div className={styles.aboutGrid}>
            {/* Text — slides from left */}
            <motion.div
              className={styles.aboutText}
              initial={{ opacity: 0, x: -60 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className={styles.eyebrow}>Our Story</p>
              <h2 className={styles.aboutTitle}>A Century of Gracious Hospitality</h2>
              <p className={styles.aboutBody}>
                Founded in 1924, Lumière has welcomed artists, diplomats, and discerning
                travellers for over a century. Our philosophy is simple: every guest deserves
                an experience that transcends accommodation and becomes a cherished memory.
              </p>
              <p className={styles.aboutBody}>
                The hotel blends Haussmann grandeur with contemporary comfort — original gilded
                mouldings alongside state-of-the-art amenities, ensuring your stay is both
                timeless and flawless.
              </p>
              <Link to="/rooms" className={styles.aboutCta}>
                Discover Our Rooms
              </Link>

              {/* Animated stat counters */}
              <div className={styles.counters}>
                <AnimatedCounter to={48} label="Luxury Suites" />
                <AnimatedCounter to={3} label="Restaurants" />
                <AnimatedCounter to={100} label="Years Legacy" />
              </div>
            </motion.div>

            {/* Image — slides from right + parallax */}
            <motion.div
              className={styles.aboutVisual}
              initial={{ opacity: 0, x: 60 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className={styles.parallaxWrap} ref={aboutImageRef}>
                <motion.img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                  alt="Lumière Hotel Interior"
                  className={`${styles.aboutImg} ${styles.parallaxEl}`}
                  style={{ y: aboutImgY }}
                  loading="lazy"
                />
              </div>

              {/* Animated gold corner frames */}
              <motion.div
                className={`${styles.corner} ${styles.cornerTL}`}
                initial={{ width: 0, height: 0 }}
                animate={aboutInView ? { width: 40, height: 40 } : {}}
                transition={{ duration: 0.6, delay: 0.55 }}
              />
              <motion.div
                className={`${styles.corner} ${styles.cornerBR}`}
                initial={{ width: 0, height: 0 }}
                animate={aboutInView ? { width: 40, height: 40 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section className={styles.testimonials} ref={testimonialsRef}>
          {/* Parallax watermark */}
          <motion.div
            className={styles.testimonialWatermark}
            style={{ x: watermarkX }}
            aria-hidden="true"
          >
            LUMIÈRE
          </motion.div>

          <div className={styles.sectionHead}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0 }}
              animate={testimonialsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Guest Experiences
            </motion.p>
            <div className={styles.clipWrap}>
              <motion.h2
                className={styles.sectionTitle}
                initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                animate={
                  testimonialsInView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}
                }
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                What Our Guests Say
              </motion.h2>
            </div>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.id}
                custom={i}
                variants={testimonialVariants}
                initial="hidden"
                animate={testimonialsInView ? 'visible' : 'hidden'}
                className={styles.quote}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <p className={styles.quoteText}>"{t.quote}"</p>
                <footer className={styles.quoteAuthor}>
                  <span className={styles.quoteName}>{t.name}</span>
                  <span className={styles.quoteRole}>{t.role}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────────────── */}
        <section className={styles.ctaBanner} ref={ctaRef}>
          {/* Infinite marquee */}
          <div className={styles.marqueeWrap} aria-hidden="true">
            <motion.div
              className={styles.marqueeTrack}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            >
              {[...Array(4)].map((_, i) => (
                <span key={i} className={styles.marqueeText}>
                  LUMIÈRE &nbsp;·&nbsp; LUXURY AWAITS &nbsp;·&nbsp; RESERVE NOW &nbsp;·&nbsp;{' '}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className={styles.ctaBannerInner}
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className={`${styles.eyebrow} ${styles.eyebrowGold}`}>Reservations</p>
            <h2 className={styles.ctaBannerTitle}>Reserve Your Stay</h2>
            <p className={styles.ctaBannerSub}>
              From intimate getaways to grand celebrations — let us craft your perfect stay.
            </p>
            <MagneticButton to="/booking">Begin Your Journey</MagneticButton>
          </motion.div>
        </section>
      </motion.main>
    </>
  );
}
