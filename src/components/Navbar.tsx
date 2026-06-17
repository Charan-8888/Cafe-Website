import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartMenu from './CartMenu';

export default function Navbar() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const closeMenu = () => setIsMobileMenuActive(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          Aura.
        </NavLink>
        <ul className={`nav-links ${isMobileMenuActive ? 'active' : ''}`}>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" onClick={closeMenu}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking/reserve" onClick={closeMenu}>
              Book
            </NavLink>
          </li>
          <li>
            <NavLink to="/summary" onClick={closeMenu}>
              Current Bookings
            </NavLink>
          </li>
        </ul>
        <CartMenu />
        <button
          className={`menu-toggle ${isMobileMenuActive ? 'active' : ''}`}
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuActive((value) => !value)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
}
