// store.js

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { storeApi } from './storeApi';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storeApi.middleware),
});

export default store;
