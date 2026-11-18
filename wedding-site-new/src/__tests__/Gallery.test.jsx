import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Gallery from '../components/Gallery';
import { config } from '../config';

describe('Gallery Component & Image Modal Enlargement', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('renders all gallery images', () => {
    render(<Gallery />);
    const photos = config.gallery;
    photos.forEach((photo) => {
      expect(screen.getByText(photo.title)).toBeDefined();
    });
  });

  it('opens enlarged modal when clicking on an image card', () => {
    render(<Gallery />);
    const firstPhoto = config.gallery[0];
    const card = screen.getByTestId(`gallery-card-${firstPhoto.id}`);

    // Click on the card to enlarge
    fireEvent.click(card);

    // Modal should show photo count and close button
    expect(screen.getByLabelText('Close enlarged photo')).toBeDefined();
    expect(screen.getByText(`Photo 1 of ${config.gallery.length}`)).toBeDefined();
    expect(screen.getAllByAltText(firstPhoto.title).length).toBeGreaterThan(0);
  });

  it('allows navigating to next and previous photos in enlarged modal', () => {
    render(<Gallery />);
    const card = screen.getByTestId(`gallery-card-${config.gallery[0].id}`);
    fireEvent.click(card);

    expect(screen.getByText(`Photo 1 of ${config.gallery.length}`)).toBeDefined();

    // Click Next
    const nextBtn = screen.getByLabelText('Next photo');
    fireEvent.click(nextBtn);
    expect(screen.getByText(`Photo 2 of ${config.gallery.length}`)).toBeDefined();

    // Click Previous
    const prevBtn = screen.getByLabelText('Previous photo');
    fireEvent.click(prevBtn);
    expect(screen.getByText(`Photo 1 of ${config.gallery.length}`)).toBeDefined();
  });

  it('closes enlarged modal on close button click', async () => {
    render(<Gallery />);
    const card = screen.getByTestId(`gallery-card-${config.gallery[0].id}`);
    fireEvent.click(card);

    const closeBtn = screen.getByLabelText('Close enlarged photo');
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByLabelText('Close enlarged photo')).toBeNull();
    });
  });

  it('closes modal on Escape key press', async () => {
    render(<Gallery />);
    const card = screen.getByTestId(`gallery-card-${config.gallery[0].id}`);
    fireEvent.click(card);

    expect(screen.getByLabelText('Close enlarged photo')).toBeDefined();

    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByLabelText('Close enlarged photo')).toBeNull();
    });
  });
});
