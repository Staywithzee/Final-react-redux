import { createContext, useContext, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Translations                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

const translations = {
  en: {
    nav: {
      menu: 'MENU',
      close: '✕ CLOSE',
      booking: 'BOOKING',
      dining: 'DINING',
      tagline: 'Established 1924 · Paris',
      links: [
        { to: '/',        label: 'Home',       end: true },
        { to: '/rooms',   label: 'Rooms' },
        { to: '/dining',  label: 'Dining' },
        { to: '/gallery', label: 'Gallery' },
        { to: '/booking', label: 'Book a Stay' },
        { to: '/admin',   label: 'Admin' },
      ],
    },

    footer: {
      tagline:  'Where luxury meets tranquility',
      navigate: 'Navigate',
      services: 'Services',
      contact:  'Contact',
      links:    { home: 'Home', rooms: 'Rooms & Suites', dining: 'Dining', gallery: 'Gallery' },
      servicesList: ['Spa & Wellness', 'Concierge', 'Infinity Pool', 'Event Spaces'],
      rights:   '© %year Lumière Hotel. All rights reserved.',
      admin:    'Admin',
    },

    home: {
      hero: {
        eyebrow:       'Established 1924 · Paris',
        subtitle:      'Where timeless elegance meets modern refinement',
        cta1:          'Explore Rooms',
        cta2:          'Book Now',
        scroll:        'Scroll',
        dateLabel:     'DATE',
        roomTypeLabel: 'ROOM TYPE',
        guestsLabel:   'GUESTS',
        bookingBtn:    'BOOKING →',
        allTypes:      'All Types',
        guestOptions:  ['1 Guest', '2 Guests', '3 Guests', '4+ Guests'],
      },
      features: [
        { icon: '🍽', title: 'Fine Dining',    desc: 'Michelin-starred cuisine by our executive chef' },
        { icon: '✦',  title: 'Spa & Wellness', desc: 'Rejuvenate in our award-winning sanctuary' },
        { icon: '◇',  title: 'Infinity Pool',  desc: 'Panoramic views over the cityscape' },
        { icon: '❧',  title: 'Concierge',      desc: 'Personalised service around the clock' },
      ],
      activities: {
        eyebrow: 'Experiences',
        title1:  'Everything You\u00a0Need,',
        title2:  'Under One Roof.',
        panels: [
          { id: 'wellness',  tab: 'Wellness',      title: 'SPA & WELLNESS RETREAT', imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', exploreLink: '/rooms' },
          { id: 'dining',    tab: 'Fine Dining',   title: 'THE LUMIÈRE TABLE',      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', exploreLink: '/dining' },
          { id: 'rooms',     tab: 'Luxury Rooms',  title: 'CURATED SUITES',         imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80', exploreLink: '/rooms' },
          { id: 'concierge', tab: 'Concierge',     title: 'PERSONALISED SERVICE',   imageUrl: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200&q=80', exploreLink: '/booking' },
        ],
      },
      roomsSection: {
        eyebrow: 'Accommodations',
        title:   'Our Curated Rooms & Suites',
        sub:     'Each room is a testament to refined taste — handcrafted furniture, bespoke textiles, and a view worth waking up for.',
        viewAll: 'View All Rooms',
      },
      about: {
        eyebrow:       'Our Story',
        title:         'A Century of Gracious Hospitality',
        body1:         'Founded in 1924, Lumière has welcomed artists, diplomats, and discerning travellers for over a century. Our philosophy is simple: every guest deserves an experience that transcends accommodation and becomes a cherished memory.',
        body2:         'The hotel blends Haussmann grandeur with contemporary comfort — original gilded mouldings alongside state-of-the-art amenities, ensuring your stay is both timeless and flawless.',
        cta:           'Discover Our Rooms',
        counterLabels: ['Luxury Suites', 'Restaurants', 'Years Legacy'],
      },
      testimonials: {
        eyebrow: 'Guest Experiences',
        title:   'What Our Guests Say',
      },
      cta: {
        eyebrow: 'Reservations',
        title:   'Reserve Your Stay',
        sub:     'From intimate getaways to grand celebrations — let us craft your perfect stay.',
        btn:     'Begin Your Journey',
      },
      marquee: 'LUMIÈRE \u00a0·\u00a0 LUXURY AWAITS \u00a0·\u00a0 RESERVE NOW \u00a0·\u00a0 ',
    },

    dining: {
      eyebrow: 'Culinary Arts',
      title:   'The Lumière Table',
      sub:     'Where French culinary heritage meets contemporary artistry',
      intro:   'At Lumière, dining is not merely sustenance — it is ceremony. Our culinary team sources the finest seasonal ingredients from local artisan producers, transforming them into edible poetry with classical technique and modern imagination.',
      reserveBtn: 'Reserve a Table',
      dressCode:  'Dress Code',
      amenities: ["In-Room Dining", "Chef's Table", 'Private Events', 'Sommelier Service'],
      panels: [
        { id: 'fine-dining', tab: 'Fine Dining',    title: 'THE LUMIÈRE TABLE',    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', exploreLink: '/dining' },
        { id: 'rooftop',     tab: 'Rooftop Bar',    title: 'TERRASSE SKY LOUNGE',  imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&q=80', exploreLink: '/dining' },
        { id: 'breakfast',   tab: 'Breakfast',      title: 'MORNING TABLE',        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', exploreLink: '/dining' },
        { id: 'private',     tab: 'Private Events', title: 'EXCLUSIVE DINING',     imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80', exploreLink: '/dining' },
      ],
      restaurants: [
        {
          id: 1,
          name: 'Le Lumière',
          type: 'Fine Dining · French Cuisine',
          hours: 'Dinner: 18:30 – 22:30 · Closed Mondays',
          description: 'Our flagship restaurant, helmed by Executive Chef Étienne Bellard, presents a symphony of contemporary French gastronomy. Each dish tells a story of provenance and precision — a Michelin experience that begins with the first glance at the menu.',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
          tags: ['Michelin Star', 'Tasting Menu', 'Wine Pairing', 'Private Dining'],
          dresscode: 'Smart Elegant',
        },
        {
          id: 2,
          name: 'Terrasse',
          type: 'Rooftop Bar & Lounge',
          hours: 'Daily: 17:00 – 01:00',
          description: 'Perched on the 12th floor with panoramic city views, Terrasse is where golden hour lingers longest. Sip handcrafted cocktails as the city transitions from day to night — an intimate experience for two or a sophisticated gathering for many.',
          image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80',
          tags: ['Cocktail Bar', 'Panoramic Views', 'Live Jazz Thursdays', 'Small Plates'],
          dresscode: 'Smart Casual',
        },
      ],
    },

    gallery: {
      eyebrow:  'Visual Journey',
      title:    'The Gallery',
      sub:      'A curated collection of moments that define the Lumière experience',
      categoryLabels: { All: 'All', Rooms: 'Rooms', Dining: 'Dining', Facilities: 'Facilities' },
    },

    rooms: {
      eyebrow:         'Accommodations',
      title:           'Rooms & Suites',
      searchPlaceholder: 'Search rooms...',
      noResults:       'No rooms match your current search or filter.',
      categoryLabels:  { All: 'All', Suite: 'Suite', Deluxe: 'Deluxe', Standard: 'Standard', Villa: 'Villa' },
      panels: [
        { id: 'suite',    tab: 'Suite',    title: 'LUMIÈRE SUITE', imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',  exploreLink: '/rooms' },
        { id: 'deluxe',   tab: 'Deluxe',   title: 'DELUXE ROOM',   imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',  exploreLink: '/rooms' },
        { id: 'villa',    tab: 'Villa',    title: 'PRIVATE VILLA',  imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',  exploreLink: '/rooms' },
        { id: 'standard', tab: 'Standard', title: 'CLASSIC ROOM',  imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',  exploreLink: '/rooms' },
      ],
    },

    roomDetail: {
      back:          '← Back',
      unavailable:   'UNAVAILABLE',
      about:         'ABOUT THIS ROOM',
      amenities:     'AMENITIES',
      policies:      'POLICIES',
      checkIn:       'CHECK-IN',
      checkOut:      'CHECK-OUT',
      cancellation:  'CANCELLATION',
      pets:          'PETS',
      checkInTime:   'From 15:00',
      checkOutTime:  'Until 12:00',
      cancelPolicy:  'Free up to 48h before arrival',
      petsPolicy:    'Not permitted',
      pricePerNight: '/ night',
      checkInLabel:  'CHECK-IN',
      checkOutLabel: 'CHECK-OUT',
      guestsLabel:   'GUESTS',
      nights:        (n) => `${n} night${n !== 1 ? 's' : ''}`,
      taxNote:       'Taxes & fees included',
      bookBtn:       'BOOK THIS ROOM',
      unavailBtn:    'CURRENTLY UNAVAILABLE',
      guests:        (n) => `${n} Guest${n !== 1 ? 's' : ''}`,
      nightRate:     (p) => `${p} × nights`,
    },

    booking: {
      noRoom:     "You haven't selected a room yet.",
      browseRooms: 'Browse Rooms',
      title:      'Complete Your Reservation',
      sub:        'Please fill in your details to confirm this booking.',
      summaryTitle:  'Booking Summary',
      guests:        'Guests',
      nights:        'Nights',
      pricePerNight: 'Per Night',
      totalLabel:    'Total',
      formTitle:     'Guest Details',
      fullName:      'Full Name',
      email:         'Email Address',
      phone:         'Phone Number',
      special:       'Special Requests (optional)',
      confirmBtn:    'CONFIRM RESERVATION',
      successMsg:    'Booking confirmed! We look forward to welcoming you.',
      errors: {
        fullName: 'Full name is required.',
        email:    'Email is required.',
        emailFmt: 'Please enter a valid email address.',
        phone:    'Phone number is required.',
      },
    },
  },

  /* ──────────────────── THAI ──────────────────── */
  th: {
    nav: {
      menu: 'เมนู',
      close: '✕ ปิด',
      booking: 'จอง',
      dining: 'ร้านอาหาร',
      tagline: 'ก่อตั้งปี 1924 · ปารีส',
      links: [
        { to: '/',        label: 'หน้าแรก',     end: true },
        { to: '/rooms',   label: 'ห้องพัก' },
        { to: '/dining',  label: 'ร้านอาหาร' },
        { to: '/gallery', label: 'แกลเลอรี่' },
        { to: '/booking', label: 'จองห้องพัก' },
        { to: '/admin',   label: 'แอดมิน' },
      ],
    },

    footer: {
      tagline:  'สัมผัสความหรูหราในโลกแห่งความสงบ',
      navigate: 'นำทาง',
      services: 'บริการ',
      contact:  'ติดต่อ',
      links:    { home: 'หน้าแรก', rooms: 'ห้องพักและสวีท', dining: 'ร้านอาหาร', gallery: 'แกลเลอรี่' },
      servicesList: ['สปาและเวลเนส', 'คอนเซียร์จ', 'สระว่ายน้ำอินฟินิตี้', 'ห้องจัดงาน'],
      rights:   '© %year โรงแรมลูมิแยร์ สงวนลิขสิทธิ์ทุกประการ',
      admin:    'แอดมิน',
    },

    home: {
      hero: {
        eyebrow:       'ก่อตั้งปี 1924 · ปารีส',
        subtitle:      'ที่ซึ่งความงามอันเหนือกาลเวลาพบกับความประณีตในยุคสมัยใหม่',
        cta1:          'สำรวจห้องพัก',
        cta2:          'จองเลย',
        scroll:        'เลื่อนดู',
        dateLabel:     'วันที่',
        roomTypeLabel: 'ประเภทห้อง',
        guestsLabel:   'จำนวนผู้เข้าพัก',
        bookingBtn:    'จอง →',
        allTypes:      'ทุกประเภท',
        guestOptions:  ['1 ท่าน', '2 ท่าน', '3 ท่าน', '4 ท่านขึ้นไป'],
      },
      features: [
        { icon: '🍽', title: 'ร้านอาหารชั้นเลิศ',      desc: 'อาหารระดับมิชลินสตาร์ โดยเชฟบริหารของเรา' },
        { icon: '✦',  title: 'สปาและเวลเนส',           desc: 'ฟื้นฟูพลังงานในสถานที่ผ่อนคลายชั้นนำ' },
        { icon: '◇',  title: 'สระว่ายน้ำอินฟินิตี้',   desc: 'วิวพาโนรามาอันงดงามเหนือเมือง' },
        { icon: '❧',  title: 'คอนเซียร์จ',              desc: 'บริการส่วนตัวตลอด 24 ชั่วโมง' },
      ],
      activities: {
        eyebrow: 'ประสบการณ์',
        title1:  'ทุกสิ่งที่คุณต้องการ',
        title2:  'ภายใต้หลังคาเดียวกัน',
        panels: [
          { id: 'wellness',  tab: 'เวลเนส',          title: 'SPA & WELLNESS RETREAT', imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', exploreLink: '/rooms' },
          { id: 'dining',    tab: 'ร้านอาหารชั้นเลิศ', title: 'THE LUMIÈRE TABLE',    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', exploreLink: '/dining' },
          { id: 'rooms',     tab: 'ห้องพักหรูหรา',    title: 'CURATED SUITES',       imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80', exploreLink: '/rooms' },
          { id: 'concierge', tab: 'คอนเซียร์จ',        title: 'PERSONALISED SERVICE', imageUrl: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200&q=80', exploreLink: '/booking' },
        ],
      },
      roomsSection: {
        eyebrow: 'ที่พัก',
        title:   'ห้องพักและสวีทคัดสรรของเรา',
        sub:     'ทุกห้องพักสะท้อนถึงรสนิยมอันประณีต — เฟอร์นิเจอร์ทำมือ ผ้าทอพิเศษ และวิวที่คุ้มค่าแก่การตื่นขึ้นมาทุกเช้า',
        viewAll: 'ดูห้องพักทั้งหมด',
      },
      about: {
        eyebrow:       'เรื่องราวของเรา',
        title:         'หนึ่งศตวรรษแห่งการต้อนรับอันอบอุ่น',
        body1:         'ก่อตั้งขึ้นในปี 1924 โรงแรมลูมิแยร์ได้ต้อนรับศิลปิน นักการทูต และนักเดินทางผู้มีรสนิยมมากว่าหนึ่งศตวรรษ ปรัชญาของเราเรียบง่ายแต่ลึกซึ้ง: แขกทุกท่านสมควรได้รับประสบการณ์ที่ก้าวข้ามเพียงแค่การพักอาศัยและกลายเป็นความทรงจำอันล้ำค่า',
        body2:         'โรงแรมผสมผสานความยิ่งใหญ่แบบฮอสมันน์เข้ากับความสะดวกสบายร่วมสมัย — ลวดลายปิดทองดั้งเดิมคู่เคียงกับสิ่งอำนวยความสะดวกทันสมัย เพื่อให้การพักของคุณทั้งคงคุณค่าและสมบูรณ์แบบ',
        cta:           'ค้นพบห้องพักของเรา',
        counterLabels: ['สวีทหรูหรา', 'ร้านอาหาร', 'ปีแห่งมรดก'],
      },
      testimonials: {
        eyebrow: 'ประสบการณ์จากแขกของเรา',
        title:   'เสียงจากแขกของเรา',
      },
      cta: {
        eyebrow: 'การจอง',
        title:   'จองที่พักของคุณ',
        sub:     'ไม่ว่าจะเป็นการพักผ่อนเงียบๆ หรืองานฉลองยิ่งใหญ่ ให้เราสร้างสรรค์การพักที่สมบูรณ์แบบสำหรับคุณ',
        btn:     'เริ่มต้นการเดินทาง',
      },
      marquee: 'LUMIÈRE \u00a0·\u00a0 ความหรูหรารอคุณอยู่ \u00a0·\u00a0 จองเลยวันนี้ \u00a0·\u00a0 ',
    },

    dining: {
      eyebrow: 'ศิลปะการทำอาหาร',
      title:   'โต๊ะอาหาร ลูมิแยร์',
      sub:     'ที่ซึ่งมรดกการทำอาหารฝรั่งเศสพบกับความสร้างสรรค์ร่วมสมัย',
      intro:   'ที่โรงแรมลูมิแยร์ การรับประทานอาหารไม่ใช่เพียงการเลี้ยงชีพ — แต่เป็นพิธีกรรมแห่งความสุข ทีมทำอาหารของเราคัดสรรวัตถุดิบตามฤดูกาลชั้นเลิศจากผู้ผลิตท้องถิ่น แปลงเป็นบทกวีที่กินได้ด้วยเทคนิคคลาสสิกและจินตนาการสมัยใหม่',
      reserveBtn: 'จองโต๊ะ',
      dressCode:  'ชุดที่เหมาะสม',
      amenities: ['อาหารในห้องพัก', 'โต๊ะเชฟ', 'งานส่วนตัว', 'บริการโซมเมอลิเยร์'],
      panels: [
        { id: 'fine-dining', tab: 'ร้านอาหารชั้นเลิศ', title: 'THE LUMIÈRE TABLE',   imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', exploreLink: '/dining' },
        { id: 'rooftop',     tab: 'บาร์บนดาดฟ้า',      title: 'TERRASSE SKY LOUNGE', imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&q=80', exploreLink: '/dining' },
        { id: 'breakfast',   tab: 'อาหารเช้า',          title: 'MORNING TABLE',        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', exploreLink: '/dining' },
        { id: 'private',     tab: 'งานส่วนตัว',         title: 'EXCLUSIVE DINING',     imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80', exploreLink: '/dining' },
      ],
      restaurants: [
        {
          id: 1,
          name: 'Le Lumière',
          type: 'ร้านอาหารชั้นเลิศ · อาหารฝรั่งเศส',
          hours: 'อาหารเย็น: 18:30 – 22:30 · หยุดทุกวันจันทร์',
          description: 'ร้านอาหารหลักของเรา ภายใต้การนำของเชฟบริหาร Étienne Bellard นำเสนอซิมโฟนีแห่งอาหารฝรั่งเศสร่วมสมัย ทุกจานบอกเล่าเรื่องราวของแหล่งที่มาและความประณีต — ประสบการณ์ระดับมิชลินที่เริ่มต้นตั้งแต่แรกพบเมนู',
          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
          tags: ['มิชลินสตาร์', 'เมนูชิม', 'จับคู่ไวน์', 'ห้องอาหารส่วนตัว'],
          dresscode: 'สมาร์ทเอเลแกนต์',
        },
        {
          id: 2,
          name: 'Terrasse',
          type: 'บาร์บนดาดฟ้า & เลานจ์',
          hours: 'ทุกวัน: 17:00 – 01:00',
          description: 'ตั้งอยู่บนชั้น 12 พร้อมวิวเมืองแบบพาโนรามา Terrasse คือสถานที่ที่ golden hour อยู่ยาวนานที่สุด จิบค็อกเทลฝีมือพิเศษขณะเมืองเปลี่ยนผ่านจากกลางวันสู่กลางคืน — บรรยากาศโรแมนติกสำหรับสองท่าน หรือการรวมกลุ่มสังสรรค์',
          image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80',
          tags: ['บาร์ค็อกเทล', 'วิวพาโนรามา', 'แจ๊สสดทุกวันพฤหัสบดี', 'อาหารจานเล็ก'],
          dresscode: 'สมาร์ทแคชชวล',
        },
      ],
    },

    gallery: {
      eyebrow:  'การเดินทางด้วยภาพ',
      title:    'แกลเลอรี่',
      sub:      'คอลเล็กชันภาพถ่ายอันล้ำค่าที่บอกเล่าประสบการณ์แห่งโรงแรมลูมิแยร์',
      categoryLabels: { All: 'ทั้งหมด', Rooms: 'ห้องพัก', Dining: 'ร้านอาหาร', Facilities: 'สิ่งอำนวยความสะดวก' },
    },

    rooms: {
      eyebrow:           'ที่พัก',
      title:             'ห้องพักและสวีท',
      searchPlaceholder: 'ค้นหาห้องพัก...',
      noResults:         'ไม่พบห้องพักที่ตรงกับการค้นหาหรือตัวกรองของคุณ',
      categoryLabels:    { All: 'ทั้งหมด', Suite: 'สวีท', Deluxe: 'ดีลักซ์', Standard: 'มาตรฐาน', Villa: 'วิลล่า' },
      panels: [
        { id: 'suite',    tab: 'สวีท',    title: 'LUMIÈRE SUITE', imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',  exploreLink: '/rooms' },
        { id: 'deluxe',   tab: 'ดีลักซ์',  title: 'DELUXE ROOM',  imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',  exploreLink: '/rooms' },
        { id: 'villa',    tab: 'วิลล่า',   title: 'PRIVATE VILLA', imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',  exploreLink: '/rooms' },
        { id: 'standard', tab: 'มาตรฐาน', title: 'CLASSIC ROOM',  imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',  exploreLink: '/rooms' },
      ],
    },

    roomDetail: {
      back:          '← กลับ',
      unavailable:   'ไม่ว่าง',
      about:         'เกี่ยวกับห้องพักนี้',
      amenities:     'สิ่งอำนวยความสะดวก',
      policies:      'นโยบาย',
      checkIn:       'เช็คอิน',
      checkOut:      'เช็คเอาต์',
      cancellation:  'การยกเลิก',
      pets:          'สัตว์เลี้ยง',
      checkInTime:   'ตั้งแต่ 15:00 น.',
      checkOutTime:  'ก่อน 12:00 น.',
      cancelPolicy:  'ยกเลิกฟรีก่อน 48 ชั่วโมง',
      petsPolicy:    'ไม่อนุญาต',
      pricePerNight: '/ คืน',
      checkInLabel:  'เช็คอิน',
      checkOutLabel: 'เช็คเอาต์',
      guestsLabel:   'จำนวนผู้เข้าพัก',
      nights:        (n) => `${n} คืน`,
      taxNote:       'รวมภาษีและค่าธรรมเนียมแล้ว',
      bookBtn:       'จองห้องพักนี้',
      unavailBtn:    'ห้องพักไม่ว่าง',
      guests:        (n) => `${n} ท่าน`,
      nightRate:     (p) => `${p} × จำนวนคืน`,
    },

    booking: {
      noRoom:      'คุณยังไม่ได้เลือกห้องพัก',
      browseRooms: 'ดูห้องพัก',
      title:       'ยืนยันการจอง',
      sub:         'กรุณากรอกข้อมูลเพื่อยืนยันการจองของคุณ',
      summaryTitle:  'สรุปการจอง',
      guests:        'ผู้เข้าพัก',
      nights:        'จำนวนคืน',
      pricePerNight: 'ราคาต่อคืน',
      totalLabel:    'รวมทั้งหมด',
      formTitle:     'ข้อมูลผู้เข้าพัก',
      fullName:      'ชื่อ-นามสกุล',
      email:         'อีเมล',
      phone:         'เบอร์โทรศัพท์',
      special:       'คำขอพิเศษ (ถ้ามี)',
      confirmBtn:    'ยืนยันการจอง',
      successMsg:    'ยืนยันการจองสำเร็จ! เรายินดีต้อนรับคุณ',
      errors: {
        fullName: 'กรุณากรอกชื่อ-นามสกุล',
        email:    'กรุณากรอกอีเมล',
        emailFmt: 'กรุณากรอกอีเมลที่ถูกต้อง',
        phone:    'กรุณากรอกเบอร์โทรศัพท์',
      },
    },
  },
};

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Context                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
