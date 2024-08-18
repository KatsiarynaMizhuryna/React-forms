import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { formSliceReducer } from './forms/formsSlice';

export const store = configureStore({
  reducer: {
    formSliceReducer,
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
