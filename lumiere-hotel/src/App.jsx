import { Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
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
      <Footer />
      <Toast />
    </>
  );
}
