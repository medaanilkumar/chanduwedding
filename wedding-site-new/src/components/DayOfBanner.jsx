import { useState, useEffect } from 'react';
import { config } from '../config';

const LIVE_WINDOW_MS = 4 * 60 * 60 * 1000;

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
  const label = { live: 'Happening now', next: 'Next up', upcoming: 'Upcoming' }[type];

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
        {event.name} · {type === 'upcoming' ? `${event.date}, ${event.time}` : event.time}
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
