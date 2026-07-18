/**
 * @file __tests__/portfolioSlice.test.ts
 * @description Unit tests for the portfolio Redux slice.
 */

import portfolioReducer, {
  toggleTheme,
  setActiveSection,
  setContactFormStatus,
} from '../store/slices/portfolioSlice';
import type { PortfolioState } from '../types';

const initialState: PortfolioState = {
  theme: 'dark',
  activeSection: 'home',
  contactFormStatus: 'idle',
};

describe('portfolioSlice', () => {
  // ── toggleTheme ──────────────────────────────────────────────
  describe('toggleTheme', () => {
    it('should switch theme from dark to light', () => {
      const state = portfolioReducer(initialState, toggleTheme());
      expect(state.theme).toBe('light');
    });

    it('should switch theme from light back to dark', () => {
      const lightState: PortfolioState = { ...initialState, theme: 'light' };
      const state = portfolioReducer(lightState, toggleTheme());
      expect(state.theme).toBe('dark');
    });

    it('should not mutate other state fields when toggling theme', () => {
      const state = portfolioReducer(initialState, toggleTheme());
      expect(state.activeSection).toBe(initialState.activeSection);
      expect(state.contactFormStatus).toBe(initialState.contactFormStatus);
    });
  });

  // ── setActiveSection ─────────────────────────────────────────
  describe('setActiveSection', () => {
    it('should update activeSection correctly', () => {
      const state = portfolioReducer(initialState, setActiveSection('skills'));
      expect(state.activeSection).toBe('skills');
    });

    it('should handle any string section id', () => {
      const state = portfolioReducer(initialState, setActiveSection('contact'));
      expect(state.activeSection).toBe('contact');
    });

    it('should not affect theme when updating section', () => {
      const state = portfolioReducer(initialState, setActiveSection('projects'));
      expect(state.theme).toBe('dark');
    });
  });

  // ── setContactFormStatus ──────────────────────────────────────
  describe('setContactFormStatus', () => {
    it('should set status to sending', () => {
      const state = portfolioReducer(initialState, setContactFormStatus('sending'));
      expect(state.contactFormStatus).toBe('sending');
    });

    it('should set status to success', () => {
      const state = portfolioReducer(initialState, setContactFormStatus('success'));
      expect(state.contactFormStatus).toBe('success');
    });

    it('should reset status back to idle', () => {
      const sendingState: PortfolioState = { ...initialState, contactFormStatus: 'sending' };
      const state = portfolioReducer(sendingState, setContactFormStatus('idle'));
      expect(state.contactFormStatus).toBe('idle');
    });
  });

  // ── initial state ─────────────────────────────────────────────
  describe('initial state', () => {
    it('should return the correct initial state when called with undefined', () => {
      const state = portfolioReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual(initialState);
    });
  });
});
