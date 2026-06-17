import { NavLink, Outlet } from 'react-router-dom';

const reservationDetails = [
  ['Best windows', '08:00 - 10:30'],
  ['Quiet hours', '14:00 - 16:30'],
  ['Group limit', '6 guests'],
];

export default function BookingLayout() {
  return (
    <section className="page-section booking-ordering page-with-bg booking-page">
      <div className="container">
        <div className="section-header center">
          <span className="section-subtitle">Join Us</span>
          <h1>Book a table</h1>
          <p className="section-lede">
            Reserve a quiet seat for espresso, pastry, and a little room to think.
          </p>
        </div>
        <div className="booking-grid">
          <div className="action-card">
            <div className="tab-container">
              <NavLink to="/booking/reserve" className="tab-btn">
                Book a Table
              </NavLink>
            </div>
            <div className="form-container">
              <Outlet />
            </div>
          </div>
          <aside className="reservation-guide" aria-label="Reservation details">
            <img src="/images/bg_booking.jpg" alt="Cafe table set for a reservation" />
            <div>
              <span className="section-subtitle">Service Notes</span>
              <h2>Made for small groups and focused mornings.</h2>
              <dl>
                {reservationDetails.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
