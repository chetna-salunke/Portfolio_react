/**
 * @file store/index.ts
 * @description Configures the Redux store and exports typed hooks.
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import portfolioReducer from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
});

/** Inferred root state type */
export type RootState = ReturnType<typeof store.getState>;

/** Inferred dispatch type */
export type AppDispatch = typeof store.dispatch;

/** Typed dispatch hook — use instead of plain `useDispatch` */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Typed selector hook — use instead of plain `useSelector` */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
