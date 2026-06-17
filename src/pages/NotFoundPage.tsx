import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="status-page">
      <span className="section-subtitle">404</span>
      <h1>Page not found</h1>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </section>
  );
}
