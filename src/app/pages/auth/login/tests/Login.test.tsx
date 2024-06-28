import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../Login';
import {
  ABOUT_TOUCHPOINT_LINK,
  ERROR_MESSAGE,
  NAVIGATING_OUR_WORLDS_LINK,
  READ_NOW_LINK,
} from '../constants';
import { renderWithProviders } from 'src/app/common/utils/testUtils.tsx';

describe('LoginPage', () => {
  beforeEach(() => {
    renderWithProviders(
      <Router>
        <LoginPage />
      </Router>,
    );
  });

  it('renders the login form with username and password inputs', () => {
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('renders the remember me checkbox and forgot your password link', () => {
    expect(screen.getByLabelText(/Remember me/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot your password?/i)).toBeInTheDocument();
  });

  it('renders the login button', () => {
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('renders the navigation links and popover button', () => {
    expect(screen.getByText(/Take a Tour/i)).toBeInTheDocument();
    expect(screen.getByText(/Navigating Our World/i)).toBeInTheDocument();
    expect(screen.getByText(/About TouchPoint/)).toBeInTheDocument();
  });

  it('renders the contact information', () => {
    expect(
      screen.getByText(/For assistance or to provide feedback/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/BASupport@brownadvisory.com/i),
    ).toBeInTheDocument();
  });

  it('renders the terms and conditions and privacy policy links', () => {
    expect(screen.getByText(/Terms and conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy policy/i)).toBeInTheDocument();
  });

  it('renders the article image and read now button', () => {
    expect(
      screen.getByAltText(/strategic advisory 2024 outlook/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read Now/i })).toBeInTheDocument();
  });

  it('username and password inputs should be initially empty', () => {
    const usernameInput: HTMLInputElement =
      screen.getByPlaceholderText(/Enter your username/i);
    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText(/Enter password/i);
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('allows user to input username and password', () => {
    const usernameInput: HTMLInputElement =
      screen.getByPlaceholderText(/Enter your username/i);
    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText(/Enter password/i);
    fireEvent.change(usernameInput, {
      target: { value: 'testuser' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'password' },
    });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password');
  });

  it('renders external links correctly', () => {
    expect(
      screen.getByText(/Navigating Our World/i).closest('a'),
    ).toHaveAttribute('href', NAVIGATING_OUR_WORLDS_LINK);
    expect(screen.getByText(/About TouchPoint/).closest('a')).toHaveAttribute(
      'href',
      ABOUT_TOUCHPOINT_LINK,
    );
    expect(screen.getByRole('link', { name: /Read Now/i })).toHaveAttribute(
      'href',
      READ_NOW_LINK,
    );
  });

  it('submits the form with valid input', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: 'validUser123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: 'validPassword' },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Login/i));
    });

    // Wait for the mock API call to resolve
    await waitFor(() => {
      expect(screen.queryByText(ERROR_MESSAGE)).not.toBeInTheDocument();
    });
  });

  it('throws error if the form is submitted with invalid input', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: '' },
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Login/i));
    });

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
    });
  });

  it('displays error message on form validation failure', async () => {
    await act(async () => {
      fireEvent.click(screen.getByText(/Login/i));
    });

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
    });
  });

  it('displays loading state when form is submitting', async () => {
    // Enter valid username and password
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: 'validUser123' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: 'validPassword' },
    });
    fireEvent.click(screen.getByText(/Login/i));
    await waitFor(() => {
      expect(screen.getByText(/Please wait/i)).toBeInTheDocument();
    });
  });

  it('displays error message on form submission failure', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: 'errorUser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {
      target: { value: 'validPassword' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    await act(async () => {
      // Wait for the mock API call to resolve and for the catch block to be executed
      await new Promise((resolve) => setTimeout(resolve, 1100));
    });
    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument();
      });
    });
    await waitFor(() => {
      expect(screen.queryByText(/Please wait/i)).not.toBeInTheDocument();
    });
  });
});
