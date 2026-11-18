import { describe, it, expect } from 'vitest';
import { config } from '../config';

describe('Wedding Configuration & Dates Verification', () => {
  it('should have valid bride and groom names', () => {
    expect(config.groom).toBe('Deepu');
    expect(config.bride).toBe('Chandu');
  });

  it('should verify wedding date matches Wednesday, 25 Nov 2026', () => {
    const weddingDate = new Date(config.date);
    expect(weddingDate.getFullYear()).toBe(2026);
    expect(weddingDate.getMonth()).toBe(10); // November (0-indexed)
    expect(weddingDate.getDate()).toBe(25);
    expect(weddingDate.getDay()).toBe(3); // Wednesday (0=Sun, 1=Mon, 2=Tue, 3=Wed)
  });

  it('should verify reception date matches Saturday, 28 Nov 2026', () => {
    const receptionDate = new Date(config.receptionDate);
    expect(receptionDate.getFullYear()).toBe(2026);
    expect(receptionDate.getMonth()).toBe(10); // November
    expect(receptionDate.getDate()).toBe(28);
    expect(receptionDate.getDay()).toBe(6); // Saturday
  });

  it('should verify every event in config.events has correct day of week in date string', () => {
    const daysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    config.events.forEach((event) => {
      const d = new Date(event.dateTimeIso);
      const expectedDay = daysMap[d.getDay()];
      expect(event.date.startsWith(expectedDay)).toBe(true);
    });
  });

  it('should have events in chronological order', () => {
    const times = config.events.map((e) => new Date(e.dateTimeIso).getTime());
    for (let i = 0; i < times.length - 1; i++) {
      expect(times[i]).toBeLessThanOrEqual(times[i + 1]);
    }
  });

  it('should verify gallery has all photos with valid ids and titles', () => {
    expect(config.gallery.length).toBeGreaterThan(0);
    config.gallery.forEach((photo) => {
      expect(photo.id).toBeDefined();
      expect(photo.title).toBeTruthy();
      expect(photo.img).toBeTruthy();
    });
  });
});
