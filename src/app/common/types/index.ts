// This file houses common types which are needed across application.

import store, { setupStore } from '../../store';

interface WelcomeState {
  userFirstName: string;
  userLastName: string;
}

interface Portfolio {
  portfolioId: string;
  portfolioGroupId: string;
  portfolioGroupName: string;
  portfolioName: string;
}

interface TransformedResponse {
  specificPortfolios: Record<
    string,
    {
      portfolioGroupName: string;
      portfolioIds: { portfolioName: string; portfolioId: string }[];
    }
  >;
  allPortfolios: string[];
}

interface PortfolioState {
  selectedPortfolio: number[];
}

type RootState = ReturnType<typeof store.getState>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

interface User {
  id: number;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface Credentials {
  username: string;
  password: string;
}

interface LoginResponse {
  id: number;
  username: string;
}

export {
  AppDispatch,
  AppStore,
  AuthState,
  Credentials,
  LoginResponse,
  Portfolio,
  PortfolioState,
  RootState,
  TransformedResponse,
  User,
  WelcomeState,
};
