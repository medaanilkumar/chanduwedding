import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DayOfBanner from '../components/DayOfBanner';

const events = [
  { name: 'Haldi', time: '10:00 AM', venue: 'Hall A', dateTimeIso: '2026-11-24T10:00:00+05:30' },
  { name: 'Wedding Ceremony', time: '8:36 AM', venue: 'Temple', dateTimeIso: '2026-11-25T08:36:00+05:30', updateNote: 'Venue moved' },
];

describe('DayOfBanner', () => {
  it('shows the live event and update note during the event window', () => {
    const now = new Date('2026-11-25T09:00:00+05:30').getTime();
    render(<DayOfBanner events={events} now={now} />);
    expect(screen.getByText('Happening now')).toBeDefined();
    expect(screen.getByText(/Venue moved/)).toBeDefined();
  });

  it('shows the next event before its start time on the same day', () => {
    const now = new Date('2026-11-25T06:00:00+05:30').getTime();
    render(<DayOfBanner events={events} now={now} />);
    expect(screen.getByText('Next up')).toBeDefined();
    expect(screen.getByText(/Wedding Ceremony · 8:36 AM/)).toBeDefined();
  });

  it('renders nothing on a non-event day', () => {
    const { container } = render(<DayOfBanner events={events} now={new Date('2026-11-20T10:00:00+05:30').getTime()} />);
    expect(container.innerHTML).toBe('');
  });

});
