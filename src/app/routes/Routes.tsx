import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AnnualEstimatedIncome from '../components/templates/annual-estimated-income/AnnualEstimatedIncome';
import PrivateEquity from '../components/templates/private-equity/PrivateEquity';
import { LandingPageLayout, RootLayout } from '../layouts';
import HoldingsSummary from '../layouts/holdings-summary/HoldingsSummary';
import { Accounts, HoldingsScreen, LoginPage, WelcomeScreen } from '../pages';
import EmployeeDropdownScreen from '../pages/employee-dropdown/EmployeeDropdown';
import ManageAccountsPage from '../pages/manage-accounts/ManageAccounts';
import ProtectedRoute from './protected-route/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<EmployeeDropdownScreen />} />
        <Route path="manage-account" element={<ManageAccountsPage />} />
        <Route element={<LandingPageLayout />}>
          <Route
            path="welcome"
            element={<WelcomeScreen />}
            // loader={welcomePageLoader} for demo purposes
          />
          <Route path="holdings" element={<HoldingsScreen />}>
            <Route index element={<HoldingsSummary />} />
            <Route path="summary" element={<HoldingsSummary />} />
            <Route
              path="fixed-income-analysis"
              element={<div>Fixed Income Analysis</div>}
            />
            <Route
              path="comon-stock-analysis"
              element={<div>Common Stock Analysis</div>}
            />
            <Route
              path="annual-estimated-income"
              element={<AnnualEstimatedIncome />}
            />
            <Route path="private-equity" element={<PrivateEquity />} />
            <Route
              path="portfolio-charecteristic"
              element={<div>Portfolio Charectristic</div>}
            />
          </Route>
          <Route path="accounts" element={<Accounts />} />
        </Route>
      </Route>
    </>,
  ),
);

export default router;
