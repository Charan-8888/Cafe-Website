import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

const renderApp = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  );

describe('Cafe booking integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('submits a reservation and shows the protected summary without a reload', async () => {
    renderApp('/booking/reserve');

    await userEvent.type(screen.getByLabelText(/full name/i), 'Ananya Iyer');
    await userEvent.type(screen.getByLabelText(/email address/i), 'ananya@example.in');
    await userEvent.type(screen.getByLabelText(/date/i), '2026-07-18');
    await userEvent.type(screen.getByLabelText(/time/i), '09:30');
    await userEvent.selectOptions(screen.getByLabelText(/number of guests/i), '4');
    await userEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

    expect(await screen.findByRole('heading', { name: /reservation summary/i })).toBeInTheDocument();
    expect(screen.getAllByText(/4 guests on 2026-07-18 at 09:30/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Ananya Iyer').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('heading', { name: /all bookings/i })).toBeInTheDocument();
  });

  it('keeps older bookings visible after a new booking is submitted', async () => {
    renderApp('/booking/reserve');

    await userEvent.type(screen.getByLabelText(/full name/i), 'Ananya Iyer');
    await userEvent.type(screen.getByLabelText(/email address/i), 'ananya@example.in');
    await userEvent.type(screen.getByLabelText(/date/i), '2026-07-18');
    await userEvent.type(screen.getByLabelText(/time/i), '09:30');
    await userEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));
    await screen.findByRole('heading', { name: /reservation summary/i });

    await userEvent.click(screen.getByRole('link', { name: /book a table/i }));
    await userEvent.clear(screen.getByLabelText(/full name/i));
    await userEvent.type(screen.getByLabelText(/full name/i), 'Rohan Sharma');
    await userEvent.type(screen.getByLabelText(/email address/i), 'rohan@example.in');
    await userEvent.type(screen.getByLabelText(/date/i), '2026-08-02');
    await userEvent.type(screen.getByLabelText(/time/i), '14:00');
    await userEvent.click(screen.getByRole('button', { name: /confirm reservation/i }));

    expect((await screen.findAllByText('Rohan Sharma')).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Ananya Iyer').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/2 guests on 2026-08-02 at 14:00/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/2 guests on 2026-07-18 at 09:30/i)).toBeInTheDocument();
  });
});
