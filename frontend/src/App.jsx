import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ListingPage from './pages/ListingPage';
import PetDetailPage from './pages/PetDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/listing" replace />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}
