import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListingPage from './pages/ListingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/listing" replace />} />
        <Route path="/listing" element={<ListingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
