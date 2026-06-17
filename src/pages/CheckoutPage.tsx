import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useCart } from '../context/useCart';
import type { CartItem } from '../types';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

type ServiceMode = 'pickup' | 'dine-in';

type OrderSummary = {
  itemCount: number;
  mode: ServiceMode;
  name: string;
  time: string;
  total: number;
};

function CheckoutItem({ item }: { item: CartItem }) {
  const lineTotal = item.price * item.quantity;

  return (
    <li className="checkout-item">
      <img src={item.image} alt={item.title} />
      <div className="checkout-item-details">
        <strong>{item.title}</strong>
        <span>{item.category}</span>
      </div>
      <span className="checkout-quantity">Qty {item.quantity}</span>
      <strong className="checkout-line-total">{formatPrice(lineTotal)}</strong>
    </li>
  );
}

function EmptyCheckout() {
  return (
    <div className="container summary-panel checkout-panel empty-bookings">
      <span className="section-subtitle">Checkout</span>
      <h1>Your cart is empty</h1>
      <p>Add menu items to your cart before checking out.</p>
      <Link to="/menu" className="btn btn-primary">
        Browse Menu
      </Link>
    </div>
  );
}

function ConfirmationPanel({ orderSummary }: { orderSummary: OrderSummary }) {
  return (
    <div className="container summary-panel checkout-panel order-confirmation">
      <span className="section-subtitle">Order placed</span>
      <h1>We have your order</h1>
      <p>
        {orderSummary.mode === 'pickup'
          ? `Pickup is set for ${orderSummary.time || 'the next available window'}.`
          : `Your table order is set for ${orderSummary.time || 'the selected visit window'}.`}
      </p>
      <dl className="checkout-breakdown">
        <div>
          <dt>Items</dt>
          <dd>{orderSummary.itemCount}</dd>
        </div>
        <div>
          <dt>Total paid at counter</dt>
          <dd>{formatPrice(orderSummary.total)}</dd>
        </div>
      </dl>
      <Link to="/menu" className="btn btn-primary">
        Start Another Order
      </Link>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, itemCount, cartTotal, clearCart } = useCart();
  const [serviceMode, setServiceMode] = useState<ServiceMode>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [tipRate, setTipRate] = useState(0);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const promoIsActive = promoCode.trim().toUpperCase() === 'AURA10';
  const checkoutTotals = useMemo(() => {
    const serviceFee = serviceMode === 'dine-in' ? 60 : 0;
    const discount = promoIsActive ? Math.round(cartTotal * 0.1) : 0;
    const tip = Math.round((cartTotal - discount) * tipRate);
    return {
      serviceFee,
      discount,
      tip,
      total: cartTotal + serviceFee + tip - discount,
    };
  }, [cartTotal, promoIsActive, serviceMode, tipRate]);

  if (orderSummary) {
    return (
      <section className="page-section page-with-bg checkout-page">
        <ConfirmationPanel orderSummary={orderSummary} />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="page-section page-with-bg checkout-page">
        <EmptyCheckout />
      </section>
    );
  }

  return (
    <section className="page-section page-with-bg checkout-page">
      <div className="container summary-panel checkout-panel">
        <span className="section-subtitle">Checkout</span>
        <h1>Finish Your Order</h1>
        <p>Review your cart, choose the handoff, and set any counter notes.</p>

        <ul className="checkout-list">
          {items.map((item) => (
            <CheckoutItem key={item.id} item={item} />
          ))}
        </ul>

        <div className="checkout-options-grid">
          <div className="checkout-option-panel">
            <h2>Handoff</h2>
            <div className="checkout-segmented" role="radiogroup" aria-label="Order handoff">
              <label className={serviceMode === 'pickup' ? 'active' : ''}>
                <input
                  type="radio"
                  name="serviceMode"
                  value="pickup"
                  checked={serviceMode === 'pickup'}
                  onChange={(event) => setServiceMode(event.target.value as ServiceMode)}
                />
                Pickup
              </label>
              <label className={serviceMode === 'dine-in' ? 'active' : ''}>
                <input
                  type="radio"
                  name="serviceMode"
                  value="dine-in"
                  checked={serviceMode === 'dine-in'}
                  onChange={(event) => setServiceMode(event.target.value as ServiceMode)}
                />
                Dine in
              </label>
            </div>
            <label className="checkout-field">
              <span>Name</span>
              <input
                type="text"
                value={customerName}
                placeholder="Counter name"
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </label>
            <label className="checkout-field">
              <span>{serviceMode === 'pickup' ? 'Pickup time' : 'Table time'}</span>
              <input type="time" value={targetTime} onChange={(event) => setTargetTime(event.target.value)} />
            </label>
          </div>

          <div className="checkout-option-panel">
            <h2>Extras</h2>
            <label className="checkout-field">
              <span>Promo code</span>
              <input
                type="text"
                value={promoCode}
                placeholder="Try AURA10"
                onChange={(event) => setPromoCode(event.target.value)}
              />
            </label>
            <div className="tip-picker" aria-label="Tip amount">
              {[0, 0.05, 0.1, 0.15].map((rate) => (
                <button
                  type="button"
                  key={rate}
                  className={tipRate === rate ? 'active' : ''}
                  onClick={() => setTipRate(rate)}
                >
                  {rate === 0 ? 'No tip' : `${rate * 100}%`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="checkout-breakdown">
          <div>
            <span>{itemCount} items</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <div>
            <span>Service</span>
            <strong>{formatPrice(checkoutTotals.serviceFee)}</strong>
          </div>
          <div>
            <span>Promo</span>
            <strong>-{formatPrice(checkoutTotals.discount)}</strong>
          </div>
          <div>
            <span>Tip</span>
            <strong>{formatPrice(checkoutTotals.tip)}</strong>
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <strong>{formatPrice(checkoutTotals.total)}</strong>
          </div>
        </div>

        <div className="button-row">
          <Link to="/menu" className="btn btn-secondary">
            Add More Items
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setOrderSummary({
                itemCount,
                mode: serviceMode,
                name: customerName,
                time: targetTime,
                total: checkoutTotals.total,
              });
              clearCart();
            }}
          >
            Place Order
          </button>
          <button type="button" className="btn btn-outline" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </section>
  );
}
