import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PortfolioState } from '../../types';

const initialState: PortfolioState = {
  theme: 'dark',
  activeSection: 'home',
  contactFormStatus: 'idle',
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
      document.documentElement.classList.toggle('light', state.theme === 'light');
    },
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
    setContactFormStatus(state, action: PayloadAction<PortfolioState['contactFormStatus']>) {
      state.contactFormStatus = action.payload;
    },
  },
});

export const { toggleTheme, setActiveSection, setContactFormStatus } = portfolioSlice.actions;
export default portfolioSlice.reducer;
