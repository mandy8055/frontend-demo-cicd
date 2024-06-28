import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { apiSlice } from './slices/api/apiSlice';

const setupStore = (
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    preloadedState,
  });
};

const store = setupStore();

export { setupStore };
export default store;
