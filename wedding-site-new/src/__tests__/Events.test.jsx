import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Events from '../components/Events';

describe('Events Component', () => {
  it('renders all four celebration cards with verified days', () => {
    render(<Events />);
    expect(screen.getAllByText('Mehendi').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mon, 23 Nov 2026').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Haldi').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Tue, 24 Nov 2026').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Wedding Ceremony').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Wed, 25 Nov 2026').length).toBeGreaterThan(0);

    expect(screen.getAllByText('Reception').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sat, 28 Nov 2026').length).toBeGreaterThan(0);
  });

  it('switches detailed card when tapping on Haldi', async () => {
    render(<Events />);
    const haldiCard = screen.getByTestId('event-card-Haldi');
    fireEvent.click(haldiCard);

    await waitFor(() => {
      expect(screen.getByText(/The Golden Glow & Auspicious Turmeric/i)).toBeDefined();
    });
  });
});
