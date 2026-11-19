import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import DayOfBanner from '../components/DayOfBanner';

const events = [
  { name: 'Haldi', date: 'Tue, 24 Nov 2026', time: '10:00 AM', venue: 'Hall A', dateTimeIso: '2026-11-24T10:00:00+05:30' },
  { name: 'Wedding Ceremony', date: 'Wed, 25 Nov 2026', time: '8:36 AM', venue: 'Temple', dateTimeIso: '2026-11-25T08:36:00+05:30', updateNote: 'Venue moved' },
];

describe('DayOfBanner popup', () => {
  beforeEach(() => {
    cleanup();
  });

  it('shows the live event and update note during the event window', () => {
    const now = new Date('2026-11-25T09:00:00+05:30').getTime();
    render(<DayOfBanner events={events} now={now} opened />);
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText('Happening now')).toBeDefined();
    expect(screen.getByText(/Venue moved/)).toBeDefined();
  });

  it('shows the next event before its start time on the same day', () => {
    const now = new Date('2026-11-25T06:00:00+05:30').getTime();
    render(<DayOfBanner events={events} now={now} opened />);
    expect(screen.getByText('Next up')).toBeDefined();
    expect(screen.getByText('Wedding Ceremony')).toBeDefined();
  });

  it('shows the next upcoming event with its date on a day with no events', () => {
    const now = new Date('2026-11-20T10:00:00+05:30').getTime();
    render(<DayOfBanner events={events} now={now} opened />);
    expect(screen.getByText('Upcoming')).toBeDefined();
    expect(screen.getByText('Tue, 24 Nov 2026, 10:00 AM')).toBeDefined();
  });

  it('does not show before the invitation is opened', () => {
    const now = new Date('2026-11-25T09:00:00+05:30').getTime();
    render(<DayOfBanner events={events} now={now} opened={false} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes when the Close button is clicked', () => {
    const now = new Date('2026-11-25T09:00:00+05:30').getTime();
    render(<DayOfBanner events={events} now={now} opened />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('shows again on a fresh page load after being closed', () => {
    const now = new Date('2026-11-25T09:00:00+05:30').getTime();
    const { unmount } = render(<DayOfBanner events={events} now={now} opened />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    unmount();

    render(<DayOfBanner events={events} now={now} opened />);
    expect(screen.getByRole('dialog')).toBeDefined();
  });

  it('closes automatically after 10 seconds', () => {
    vi.useFakeTimers();
    const now = new Date('2026-11-25T09:00:00+05:30').getTime();
    render(<DayOfBanner events={events} now={now} opened />);
    expect(screen.getByRole('dialog')).toBeDefined();
    act(() => {
      vi.advanceTimersByTime(9 * 1000);
    });
    expect(screen.queryByRole('dialog')).not.toBeNull();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByRole('dialog')).toBeNull();
    vi.useRealTimers();
  });

  it('renders nothing once all events have passed', () => {
    render(<DayOfBanner events={events} now={new Date('2026-11-30T10:00:00+05:30').getTime()} opened />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
