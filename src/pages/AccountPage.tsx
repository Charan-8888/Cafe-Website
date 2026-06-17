import { Link } from 'react-router-dom';
import { useBooking } from '../context/useBooking';

export default function AccountPage() {
  const { lastBooking, bookingLabel } = useBooking();

  return (
    <section className="page-section">
      <div className="container account-grid">
        <div>
          <span className="section-subtitle">Guest Account</span>
          <h1>Your cafe visit</h1>
          <p>
            This page reads from the same booking context as the navigation and summary page,
            demonstrating lifted global state.
          </p>
          <Link to="/booking/reserve" className="btn btn-primary">
            Start Booking
          </Link>
        </div>
        <aside className="account-panel">
          <h2>Current Status</h2>
          <p>{bookingLabel}</p>
          {lastBooking && <small>Saved locally on this browser.</small>}
        </aside>
      </div>
    </section>
  );
}
