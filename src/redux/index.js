import { configureStore } from '@reduxjs/toolkit';
import { charactersSlice } from './characters';

export const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

