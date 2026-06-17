import { useContext } from 'react';
import { BookingContext } from './BookingContextValue';

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used inside BookingProvider');
  }
  return context;
}
