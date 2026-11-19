import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { config } from '../config';

const LIVE_WINDOW_MS = 4 * 60 * 60 * 1000;
const SEEN_KEY = 'dayOfPopupSeen';
const AUTO_CLOSE_MS = 15 * 1000;

const istDay = (ms) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(ms);

// Returns the live event, otherwise the next upcoming event, or null when none remain.
function getDayOfStatus(events, now) {
  const live = events.find((ev) => {
    const start = new Date(ev.dateTimeIso).getTime();
    return now >= start && now < start + LIVE_WINDOW_MS;
  });
  if (live) return { type: 'live', event: live };

  const upcoming = events
    .filter((ev) => new Date(ev.dateTimeIso).getTime() > now)
    .sort((a, b) => new Date(a.dateTimeIso) - new Date(b.dateTimeIso))[0];
  if (!upcoming) return null;

  const sameDay = istDay(new Date(upcoming.dateTimeIso).getTime()) === istDay(now);
  return { type: sameDay ? 'next' : 'upcoming', event: upcoming };
}

export default function DayOfBanner({ events = config.events, now, opened = true }) {
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(SEEN_KEY) === '1');
  const [current, setCurrent] = useState(() => now ?? Date.now());

  useEffect(() => {
    if (now !== undefined) return;
    const id = setInterval(() => setCurrent(Date.now()), 60 * 1000);
    return () => clearInterval(id);
  }, [now]);

  const close = () => {
    sessionStorage.setItem(SEEN_KEY, '1');
    setDismissed(true);
  };

  useEffect(() => {
    if (!opened || dismissed) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [opened, dismissed]);

  useEffect(() => {
    if (!opened || dismissed) return;
    const id = setTimeout(close, AUTO_CLOSE_MS);
    return () => clearTimeout(id);
  }, [opened, dismissed]);

  if (!opened || dismissed) return null;
  const status = getDayOfStatus(events, now ?? current);
  if (!status) return null;

  const { type, event } = status;
  const label = { live: 'Happening now', next: 'Next up', upcoming: 'Upcoming' }[type];

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      style={{ background: 'rgba(6, 12, 30, 0.7)' }}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${label}: ${event.name}`}
        onClick={(e) => e.stopPropagation()}
        className="card-peach relative w-full max-w-sm rounded-2xl border border-gold/50 px-6 py-6 text-center shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss"
          className="absolute top-3 right-3 p-1.5 rounded-full text-gold hover:text-white border border-gold/40 cursor-pointer"
        >
          ✕
        </button>
        <p
          className="text-[11px] font-semibold uppercase tracking-widest text-gold"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {label}
        </p>
        <p
          className="mt-2 text-2xl text-gold"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
        >
          {event.name}
        </p>
        <p className="mt-1 text-base text-ink" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {type === 'upcoming' ? `${event.date}, ${event.time}` : event.time}
        </p>
        <p className="mt-1 text-sm text-ink/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {event.venue}
        </p>
        {event.updateNote && (
          <p className="mt-3 text-sm italic text-gold-l" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Update: {event.updateNote}
          </p>
        )}
        <button
          type="button"
          onClick={close}
          className="btn-gold mt-5 py-2.5 px-6 text-xs cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}
