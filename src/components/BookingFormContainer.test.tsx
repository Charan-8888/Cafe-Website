import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BookingProvider } from '../context/BookingContext';
import BookingFormContainer from './BookingFormContainer';
import type { BookingMode } from '../types';

const renderBookingForm = (mode: BookingMode = 'reserve') =>
  render(
    <MemoryRouter>
      <BookingProvider>
        <BookingFormContainer mode={mode} />
      </BookingProvider>
    </MemoryRouter>,
  );

describe('BookingFormContainer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows validation errors for empty controlled reservation fields', async () => {
    renderBookingForm('reserve');

    await userEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

    expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/choose a reservation date/i)).toBeInTheDocument();
  });

  it('validates the uncontrolled pickup order field through a ref', async () => {
    renderBookingForm('pickup');

    await userEvent.type(screen.getByLabelText(/full name/i), 'Ananya Iyer');
    await userEvent.type(screen.getByLabelText(/email address/i), 'ananya@example.in');
    await userEvent.type(screen.getByLabelText(/pickup time/i), '10:30');
    await userEvent.type(screen.getByLabelText(/your order/i), 'Latte');
    await userEvent.click(screen.getByRole('button', { name: /place order/i }));

    expect(screen.getByText(/describe at least one pickup item/i)).toBeInTheDocument();
  });

  it('does not write malformed JSON from storage to the console', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('aura-cafe-booking', '{bad-json');

    renderBookingForm('reserve');

    expect(console.error).not.toHaveBeenCalled();
  });
});
