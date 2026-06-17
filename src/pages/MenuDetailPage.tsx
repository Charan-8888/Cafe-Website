import { Link, useParams } from 'react-router-dom';
import { getMenuItemById } from '../data/menuItems';
import { useCart } from '../context/useCart';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

export default function MenuDetailPage() {
  const { itemId } = useParams();
  const item = getMenuItemById(itemId);
  const { addToCart } = useCart();

  if (!item) {
    return (
      <section className="status-page">
        <h1>Menu item not found</h1>
        <Link to="/menu" className="btn btn-primary">
          Back to Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container detail-grid">
        <img src={item.image} alt={item.title} className="detail-image" />
        <div>
          <span className="section-subtitle">{item.category}</span>
          <h1>{item.title}</h1>
          <p>{item.detail}</p>
          <dl className="menu-detail-facts detail-page-facts">
            <div>
              <dt>Prep</dt>
              <dd>{item.prepTime}</dd>
            </div>
            <div>
              <dt>Pairing</dt>
              <dd>{item.pairing}</dd>
            </div>
          </dl>
          <p className="detail-price">{formatPrice(item.price)}</p>
          <div className="button-row">
            <button type="button" className="btn btn-primary" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
            <Link to="/menu" className="btn btn-secondary">
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
