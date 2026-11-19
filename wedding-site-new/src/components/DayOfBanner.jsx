import { useState, useEffect } from 'react';
import { config } from '../config';

const LIVE_WINDOW_MS = 4 * 60 * 60 * 1000;

const istDay = (ms) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(ms);

// Returns the status to show at `now`, or null when no event is scheduled that IST day.
function getDayOfStatus(events, now) {
  const today = events.filter((ev) => istDay(new Date(ev.dateTimeIso).getTime()) === istDay(now));
  const live = today.find((ev) => {
    const start = new Date(ev.dateTimeIso).getTime();
    return now >= start && now < start + LIVE_WINDOW_MS;
  });
  if (live) return { type: 'live', event: live };

  const next = today.find((ev) => new Date(ev.dateTimeIso).getTime() > now);
  if (next) return { type: 'next', event: next };
  return null;
}

export default function DayOfBanner({ events = config.events, now }) {
  const [current, setCurrent] = useState(() => now ?? Date.now());

  useEffect(() => {
    if (now !== undefined) return;
    const id = setInterval(() => setCurrent(Date.now()), 60 * 1000);
    return () => clearInterval(id);
  }, [now]);

  const status = getDayOfStatus(events, now ?? current);
  if (!status) return null;

  const { type, event } = status;
  const label = type === 'live' ? 'Happening now' : 'Next up';

  return (
    <div
      role="status"
      className="card-peach mx-4 sm:mx-auto my-4 max-w-2xl rounded-2xl border border-gold/40 px-5 py-3 text-center"
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-widest text-gold"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {label}
      </p>
      <p
        className="mt-1 text-lg text-gold"
        style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
      >
        {event.name} · {event.time}
      </p>
      <p className="text-sm text-ink/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {event.venue}
      </p>
      {event.updateNote && (
        <p className="mt-2 text-sm italic text-gold-l" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Update: {event.updateNote}
        </p>
      )}
    </div>
  );
}
