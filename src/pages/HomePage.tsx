import { Link } from 'react-router-dom';

const highlights = [
  {
    title: 'Seasonal espresso',
    detail: 'Rotating lots dialed in for clarity, sweetness, and a steady morning rhythm.',
    image: '/images/menu_latte.jpg',
    alt: 'Latte with detailed milk art',
  },
  {
    title: 'Small-batch pastry',
    detail: 'Croissants, buns, and tarts baked through service instead of all at once.',
    image: '/images/menu_almond_croissant.jpg',
    alt: 'Fresh almond croissant on a plate',
  },
  {
    title: 'Tables held daily',
    detail: 'A quiet reservation flow for breakfast meetings, solo work, and weekend plans.',
    image: '/images/cafe_vibes.png',
    alt: 'Warm cafe seating with coffee service',
  },
];

const rituals = [
  { value: '07:00', label: 'weekday doors' },
  { value: '11', label: 'menu staples' },
  { value: '36', label: 'seats inside' },
];

export default function HomePage() {
  return (
    <>
      <section className="hero home-hero">
        <div className="hero-overlay"></div>
        <div className="home-hero-content">
          <span className="section-subtitle">Aura Coffee Roasters</span>
          <h1>Quiet coffee. Sharp mornings.</h1>
          <p>Seasonal espresso, fresh pastry, and table bookings in one calm place.</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">
              View Menu
            </Link>
            <Link to="/booking/reserve" className="btn btn-secondary">
              Book a Table
            </Link>
          </div>
          <dl className="hero-metrics" aria-label="Cafe highlights">
            {rituals.map((ritual) => (
              <div key={ritual.label}>
                <dt>{ritual.value}</dt>
                <dd>{ritual.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="feature-strip" aria-labelledby="home-highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Today at Aura</span>
            <h2 id="home-highlights">Roasted, baked, and held for real visits.</h2>
          </div>
          <div className="feature-grid">
            {highlights.map((highlight) => (
              <article key={highlight.title}>
                <img src={highlight.image} alt={highlight.alt} />
                <div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="visit-panel" aria-labelledby="visit-title">
        <div className="container visit-grid">
          <div className="visit-copy">
            <span className="section-subtitle">Plan the stop</span>
            <h2 id="visit-title">A slower room for sharper coffee.</h2>
            <p>
              Settle into the front bar for a quick espresso, take a window table for
              a working hour, or reserve ahead when the morning matters.
            </p>
            <Link to="/booking/reserve" className="btn btn-primary">
              Reserve a Seat
            </Link>
          </div>
          <div className="visit-image-stack" aria-hidden="true">
            <img src="/images/hero_bg.png" alt="" />
            <img src="/images/croissant_pastry.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
