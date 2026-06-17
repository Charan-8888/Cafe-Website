import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import type { CartItem, MenuItem } from '../types';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

function CartIcon() {
  return (
    <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.2 6h15.1l-1.7 8.4a2 2 0 0 1-2 1.6H8.8a2 2 0 0 1-2-1.7L5.3 3.8H2.8" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </svg>
  );
}

type CartItemRowProps = {
  item: CartItem;
  onIncrement: (item: CartItem) => void;
  onDecrement: (cartItemId: string) => void;
  onRemove: (cartItemId: string) => void;
};

function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  return (
    <li>
      <div className="cart-item-summary">
        <img src={item.image} alt={item.title} className="cart-item-image" />
        <div>
          <strong>{item.title}</strong>
          <span>
            {item.quantity} x {formatPrice(item.price)}
          </span>
        </div>
      </div>
      <div className="cart-row-actions" aria-label={`${item.title} quantity controls`}>
        <button type="button" onClick={() => onDecrement(item.id)} aria-label={`Decrease ${item.title}`}>
          -
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => onIncrement(item)} aria-label={`Increase ${item.title}`}>
          +
        </button>
        <button type="button" className="cart-remove" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    </li>
  );
}

type CartContentsProps = {
  items: CartItem[];
  cartTotal: number;
  onIncrement: (item: MenuItem | CartItem) => void;
  onDecrement: (cartItemId: string) => void;
  onRemove: (cartItemId: string) => void;
  onClear: () => void;
  onCheckout: () => void;
};

function CartContents({ items, cartTotal, onIncrement, onDecrement, onRemove, onClear, onCheckout }: CartContentsProps) {
  if (items.length === 0) return <p>No items yet.</p>;

  return (
    <>
      <ul className="cart-list">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
          />
        ))}
      </ul>
      <div className="cart-total">
        <span>Total</span>
        <strong>{formatPrice(cartTotal)}</strong>
      </div>
      <button type="button" className="btn btn-outline cart-clear" onClick={onClear}>
        Clear Cart
      </button>
      <Link to="/checkout" className="btn btn-primary cart-checkout" onClick={onCheckout}>
        Check Out
      </Link>
    </>
  );
}

export default function CartMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, itemCount, cartTotal, addToCart, decrementCartItem, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-menu">
      <button
        className="cart-button"
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-label={`Cart with ${itemCount} item${itemCount === 1 ? '' : 's'}`}
      >
        <CartIcon />
        <span>{itemCount}</span>
      </button>
      {isOpen && (
        <div className="cart-popover">
          <h2>Cart</h2>
          <CartContents
            items={items}
            cartTotal={cartTotal}
            onIncrement={addToCart}
            onDecrement={decrementCartItem}
            onRemove={removeFromCart}
            onClear={clearCart}
            onCheckout={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
