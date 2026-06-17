import { useEffect, useMemo, useState } from 'react';
import { BookingContext } from './BookingContextValue';
import type { Booking, NewBooking, PropsWithChildren } from '../types';

const STORAGE_KEY = 'aura-cafe-bookings';
const LEGACY_STORAGE_KEY = 'aura-cafe-booking';

const readStoredBookings = (): Booking[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as Booking[]) : [];
    }

    const legacyStored = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacyStored) return [];

    const legacyBooking = JSON.parse(legacyStored);
    return legacyBooking ? [legacyBooking as Booking] : [];
  } catch {
    return [];
  }
};

export function BookingProvider({ children }: PropsWithChildren) {
  const [bookings, setBookings] = useState<Booking[]>(readStoredBookings);
  const lastBooking = bookings.at(-1) || null;

  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [bookings]);

  const bookingLabel = useMemo(() => {
    if (!lastBooking) return 'No active booking';
    return lastBooking.type === 'reserve'
      ? `${lastBooking.guests} guests on ${lastBooking.date} at ${lastBooking.time}`
      : `Pickup at ${lastBooking.time}`;
  }, [lastBooking]);

  const value = useMemo(
    () => ({
      bookings,
      lastBooking,
      bookingLabel,
      saveBooking: (booking: NewBooking) =>
        setBookings((current) => [
          ...current,
          {
            ...booking,
            id: booking.id || crypto.randomUUID(),
          },
        ]),
      clearBookings: () => setBookings([]),
    }),
    [bookingLabel, bookings, lastBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
