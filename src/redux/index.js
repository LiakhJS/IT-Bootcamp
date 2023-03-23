// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { characterSlice } from './character';

export const store = configureStore({
  reducer: {
    character: characterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({

    serializableCheck: false,
  }),
});

