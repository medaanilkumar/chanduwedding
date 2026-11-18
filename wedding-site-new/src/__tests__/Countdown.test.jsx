import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Countdown from '../components/Countdown';

describe('Countdown Component', () => {
  it('renders Reception countdown headers clearly', () => {
    render(<Countdown />);
    expect(screen.getByText(/Grand Reception Countdown/i)).toBeDefined();
    expect(screen.getAllByText(/Reception Countdown/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Saturday, 28 November 2026/i)).toBeDefined();
    expect(screen.getByText(/Sri Venkateswara Kalyana Mandapam, NRT/i)).toBeDefined();
  });

  it('clarifies wedding muhurtham date', () => {
    render(<Countdown />);
    expect(screen.getByText(/Wednesday, 25 Nov 2026/i)).toBeDefined();
    expect(screen.getByText(/Annavaram Temple/i)).toBeDefined();
  });
});
