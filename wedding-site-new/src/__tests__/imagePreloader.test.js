import { describe, it, expect } from 'vitest';
import { ALL_WEDDING_IMAGES, preloadWeddingImages } from '../utils/imagePreloader';

describe('Image Preloader Utility', () => {
  it('includes all gallery and portrait wedding images', () => {
    expect(ALL_WEDDING_IMAGES.length).toBeGreaterThan(10);
    ALL_WEDDING_IMAGES.forEach((src) => {
      expect(src).toBeTruthy();
    });
  });

  it('preloads images and reaches 100% completion', async () => {
    let progressReached = 0;
    await preloadWeddingImages((progress) => {
      progressReached = progress;
    });
    expect(progressReached).toBe(100);
  });
});
