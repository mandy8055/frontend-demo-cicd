import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from 'src/app/common/types';

const selectAuthState = (state: RootState) => state.auth;

const selectIsAuthenticated = createSelector(
  selectAuthState,
  (authState) => authState.isAuthenticated,
);

const selectLoginError = createSelector(
  selectAuthState,
  (authState) => authState.error,
);

const selectLoginLoading = createSelector(
  selectAuthState,
  (authState) => authState.loading,
);

export { selectIsAuthenticated, selectLoginError, selectLoginLoading };
