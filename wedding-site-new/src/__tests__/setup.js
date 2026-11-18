import { beforeAll } from 'vitest';

beforeAll(() => {
  // Mock IntersectionObserver for JSDOM
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.IntersectionObserver = MockIntersectionObserver;
  window.IntersectionObserver = MockIntersectionObserver;

  // Mock matchMedia
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {},
    };
  };

  // Mock AudioContext
  window.AudioContext = window.AudioContext || class {
    constructor() {
      this.state = 'running';
      this.currentTime = 0;
      this.destination = {};
    }
    createGain() {
      return {
        gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
        connect: () => {},
      };
    }
    createOscillator() {
      return {
        type: 'sine',
        frequency: { setValueAtTime: () => {} },
        connect: () => {},
        start: () => {},
        stop: () => {},
      };
    }
    createBiquadFilter() {
      return {
        type: 'lowpass',
        frequency: { setValueAtTime: () => {} },
        Q: { setValueAtTime: () => {} },
        connect: () => {},
      };
    }
    resume() {
      return Promise.resolve();
    }
  };
});
