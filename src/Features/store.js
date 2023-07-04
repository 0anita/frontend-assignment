// Need to use the React-specific entry point to import createApi
import { configureStore } from '@reduxjs/toolkit'
import { storeApi } from './storeApi'

// Define a service using a base URL and expected endpoints
export const store = configureStore({
  reducer: {
//Add the generated reducer as a specific top level slice
  [storeApi.reducerPath]: storeApi.reducer,
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      storeApi.middleware,
  
    ])
  
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
