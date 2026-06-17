import { Navigate, Route, Routes } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import MenuDetailPage from './pages/MenuDetailPage';
import BookingLayout from './pages/BookingLayout';
import BookingPage from './pages/BookingPage';
import BookingSummaryPage from './pages/BookingSummaryPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';
import CheckoutPage from './pages/CheckoutPage';
import type { PropsWithChildren } from './types';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="menu/:itemId" element={<MenuDetailPage />} />
        <Route path="booking" element={<BookingLayout />}>
          <Route index element={<Navigate to="reserve" replace />} />
          <Route path=":mode" element={<BookingPage />} />
        </Route>
        <Route path="summary" element={<BookingSummaryPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function AppProviders({ children }: PropsWithChildren) {
  return (
    <BookingProvider>
      <CartProvider>{children}</CartProvider>
    </BookingProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </ErrorBoundary>
  );
}
