import { config } from '../config';
import portraitImg from '../images/RAJ05022.JPG.jpeg';

export const ALL_WEDDING_IMAGES = [
  portraitImg,
  ...config.gallery.map((p) => p.img),
];

/**
 * Preloads all high-res wedding images and decodes them into memory cache before entry.
 * Calls onProgress with percentage (0 to 100).
 */
export function preloadWeddingImages(onProgress) {
  const total = ALL_WEDDING_IMAGES.length;
  if (total === 0) {
    if (onProgress) onProgress(100);
    return Promise.resolve();
  }

  let loaded = 0;

  return new Promise((resolve) => {
    let completed = false;

    const finish = () => {
      if (!completed) {
        completed = true;
        if (onProgress) onProgress(100);
        resolve();
      }
    };

    // Safety timeout: never block guests if network hangs
    const timeoutId = setTimeout(finish, 3000);

    ALL_WEDDING_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;

      // Modern browser image decode for instant zero-jank paint
      if (img.decode) {
        img
          .decode()
          .catch(() => {})
          .finally(() => {
            loaded++;
            if (onProgress) onProgress(Math.min(100, Math.round((loaded / total) * 100)));
            if (loaded >= total) {
              clearTimeout(timeoutId);
              finish();
            }
          });
      } else {
        const onDone = () => {
          loaded++;
          if (onProgress) onProgress(Math.min(100, Math.round((loaded / total) * 100)));
          if (loaded >= total) {
            clearTimeout(timeoutId);
            finish();
          }
        };
        if (img.complete) {
          onDone();
        } else {
          img.onload = onDone;
          img.onerror = onDone;
        }
      }
    });
  });
}
