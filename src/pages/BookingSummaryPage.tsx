import { Link } from 'react-router-dom';
import { useBooking } from '../context/useBooking';
import type { Booking, PropsWithChildren } from '../types';

function SummaryActions({ onClearBookings }: { onClearBookings?: () => void }) {
  return (
    <div className="button-row centered">
      <Link to="/booking/reserve" className="btn btn-secondary">
        Book a Table
      </Link>
      <Link to="/menu" className="btn btn-primary">
        Order Online
      </Link>
      {onClearBookings && (
        <button type="button" className="btn btn-outline" onClick={onClearBookings}>
          Clear History
        </button>
      )}
    </div>
  );
}

function EmptyBookings() {
  return (
    <div className="container summary-panel empty-bookings">
      <span className="section-subtitle">Bookings</span>
      <h1>No bookings</h1>
      <p>No bookings yet. Create a reservation or order online to see it here.</p>
      <SummaryActions />
    </div>
  );
}

type BookingDetailsProps = PropsWithChildren & {
  booking: Booking;
  bookingLabel: string;
};

function BookingDetails({ booking, bookingLabel, children }: BookingDetailsProps) {
  const isReserve = booking.type === 'reserve';

  return (
    <div className="container summary-panel">
      <span className="section-subtitle">Confirmed</span>
      <h1>{isReserve ? 'Reservation Summary' : 'Pickup Summary'}</h1>
      <p>{bookingLabel}</p>
      <dl className="summary-list">
        <div>
          <dt>Name</dt>
          <dd>{booking.name}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{booking.email}</dd>
        </div>
        <div>
          <dt>{isReserve ? 'Date' : 'Order'}</dt>
          <dd>{isReserve ? booking.date : booking.order}</dd>
        </div>
      </dl>
      {children}
    </div>
  );
}

function HistoryCard({ booking, index }: { booking: Booking; index: number }) {
  const isReserve = booking.type === 'reserve';
  const details = isReserve
    ? `${booking.guests} guests on ${booking.date} at ${booking.time}`
    : `Pickup at ${booking.time}`;

  return (
    <article className="history-card" key={booking.id || `${booking.createdAt}-${index}`}>
      <span className="history-type">{isReserve ? 'Reservation' : 'Pickup'}</span>
      <h3>{booking.name}</h3>
      <p>{details}</p>
      {booking.order && <p className="history-order">{booking.order}</p>}
      <small>{new Date(booking.createdAt).toLocaleString()}</small>
    </article>
  );
}

function BookingHistory({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="container booking-history">
      <div className="section-header center">
        <span className="section-subtitle">Persistent History</span>
        <h2>All Bookings</h2>
      </div>
      <div className="history-grid">
        {bookings.map((booking, index) => (
          <HistoryCard booking={booking} index={index} key={booking.id || `${booking.createdAt}-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default function BookingSummaryPage() {
  const { bookings, lastBooking, bookingLabel, clearBookings } = useBooking();
  const history = [...bookings].reverse();

  if (!lastBooking) {
    return (
      <section className="page-section page-with-bg current-bookings-page">
        <EmptyBookings />
      </section>
    );
  }

  return (
    <section className="page-section page-with-bg current-bookings-page">
      <BookingDetails booking={lastBooking} bookingLabel={bookingLabel}>
        <SummaryActions onClearBookings={clearBookings} />
      </BookingDetails>
      <BookingHistory bookings={history} />
    </section>
  );
}
