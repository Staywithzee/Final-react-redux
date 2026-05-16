import { AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from 'react-router-dom';
import { useSmoothScroll, lenisInstance } from './hooks/useSmoothScroll';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Toast from './components/Toast/Toast';
import HomePage from './pages/HomePage';
import DiningPage from './pages/DiningPage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';
import RoomsPage from './features/rooms/RoomsPage';
import RoomDetailPage from './features/rooms/RoomDetailPage';
import BookingPage from './features/booking/BookingPage';
import AdminPage from './features/admin/AdminPage';
import RoomFormPage from './features/admin/RoomFormPage';

// Prevent browser from restoring scroll position on navigation
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

function scrollToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (lenisInstance) {
    lenisInstance.stop();
    lenisInstance.scrollTo(0, { immediate: true, force: true });
    lenisInstance.start();
  }
}

export default function App() {
  useSmoothScroll();
  const location = useLocation();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetailPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/rooms/new" element={<RoomFormPage />} />
          <Route path="/admin/rooms/:id/edit" element={<RoomFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Toast />
    </>
  );
}
