import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { menuCategories, menuItems } from '../data/menuItems';
import { useCart } from '../context/useCart';
import type { MenuItem } from '../types';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

function useEscapeKey(isActive: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!isActive) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onEscape]);
}

type MenuItemCardProps = {
  item: MenuItem;
  onViewDetails: (item: MenuItem) => void;
};

function MenuItemCard({ item, onViewDetails }: MenuItemCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="menu-item">
      <button
        type="button"
        className="menu-item-image-link"
        aria-label={`View ${item.title}`}
        onClick={() => onViewDetails(item)}
      >
        <img src={item.image} alt={item.title} className="menu-item-image" />
        {item.badge && <span className="menu-badge">{item.badge}</span>}
      </button>
      <div className="menu-item-header">
        <div>
          <h3>{item.title}</h3>
          <span className="menu-card-meta">
            {item.prepTime} · Pairs with {item.pairing}
          </span>
        </div>
        <span className="price">{formatPrice(item.price)}</span>
      </div>
      <p>{item.description}</p>
      <ul className="menu-note-list" aria-label={`${item.title} tasting notes`}>
        {item.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <div className="menu-actions">
        <button type="button" className="text-link detail-trigger" onClick={() => onViewDetails(item)}>
          More Info
        </button>
        <button type="button" className="btn btn-outline menu-cart-btn" onClick={() => addToCart(item)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

type MenuDetailsModalProps = {
  item: MenuItem | null;
  onAddToCart: (item: MenuItem) => void;
  onClose: () => void;
};

function MenuDetailsModal({ item, onAddToCart, onClose }: MenuDetailsModalProps) {
  if (!item) return null;

  return (
    <div className="menu-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="menu-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-modal-title"
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <button type="button" className="menu-modal-close" aria-label="Close details" onClick={onClose}>
          x
        </button>
        <img src={item.image} alt={item.title} className="menu-modal-image" />
        <div className="menu-modal-content">
          <span className="section-subtitle">{item.category}</span>
          <h2 id="menu-modal-title">{item.title}</h2>
          <p>{item.detail}</p>
          <dl className="menu-detail-facts">
            <div>
              <dt>Prep</dt>
              <dd>{item.prepTime}</dd>
            </div>
            <div>
              <dt>Pairing</dt>
              <dd>{item.pairing}</dd>
            </div>
          </dl>
          <ul className="menu-note-list modal-notes" aria-label={`${item.title} tasting notes`}>
            {item.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <div className="menu-modal-footer">
            <strong>{formatPrice(item.price)}</strong>
            <button type="button" className="btn btn-primary" onClick={() => onAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();
  const visibleCategories = useMemo(() => menuCategories, []);

  const closeDetails = () => setSelectedItem(null);
  useEscapeKey(Boolean(selectedItem), closeDetails);

  return (
    <section className="page-section menu page-with-bg menu-page">
      <div className="container">
        <div className="section-header center">
          <span className="section-subtitle">Tasting Menu</span>
          <h1>Sip & Savor</h1>
          <p className="section-lede">
            Browse {menuItems.length} cafe staples across espresso, pastry, and dessert.
          </p>
        </div>
        <div className="menu-grid two-column">
          {Object.entries(visibleCategories).map(([category, items]) => (
            <section className="menu-category" key={category}>
              <div className="menu-category-header">
                <h2>{category}</h2>
                <span>{items.length} items</span>
              </div>
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onViewDetails={setSelectedItem} />
              ))}
            </section>
          ))}
        </div>
      </div>
      <MenuDetailsModal
        key={selectedItem?.id || 'empty-menu-detail'}
        item={selectedItem}
        onAddToCart={addToCart}
        onClose={closeDetails}
      />
    </section>
  );
}
