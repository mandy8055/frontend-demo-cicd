import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header, { profileData } from '../Header';
import { renderWithProviders } from 'src/app/common/utils/testUtils';
import type { MockInstance } from 'vitest';

describe('Header Component', () => {
  let logoutUserSpy: MockInstance;

  beforeEach(async () => {
    renderWithProviders(
      <Router>
        <Header />
      </Router>,
    );

    // dynamic import was required here(important)
    const authSlice = await import('src/app/store/slices/authSlice');
    logoutUserSpy = vi.spyOn(authSlice, 'logoutUser');
  });

  afterEach(() => {
    logoutUserSpy.mockRestore();
  });

  it('renders header with logo and buttons', () => {
    const logo = screen.getByAltText('BA header logo');
    expect(logo).toBeInTheDocument();
    const profileButton = screen.getByText('My Profile');
    expect(profileButton).toBeInTheDocument();
    const logOutButton = screen.getByText('Log Out');
    expect(logOutButton).toBeInTheDocument();
  });

  it('opens profile menu on button click and displays profile links', () => {
    const profileButton = screen.getByText('My Profile');
    fireEvent.click(profileButton);
    profileData.forEach((item) => {
      const link = screen.getByText(item.linkName);
      expect(link).toBeInTheDocument();
    });
  });

  it('ensures profile links have correct href', () => {
    const profileButton = screen.getByText('My Profile');
    fireEvent.click(profileButton);
    profileData.forEach((item) => {
      const link = screen.getByText(item.linkName);
      expect(link.closest('a')).toHaveAttribute('href', item.linkTo);
    });
  });

  it('logs out user on button click', async () => {
    const logOutButton = screen.getByText('Log Out');
    fireEvent.click(logOutButton);

    await waitFor(() => {
      expect(logoutUserSpy).toHaveBeenCalled();
    });
  });

  it('should close the popover when a profile link is clicked', () => {
    const profileButton = screen.getByText('My Profile');
    fireEvent.click(profileButton);
    const link = screen.getByText(profileData[0].linkName);
    fireEvent.click(link);
    profileData.forEach((item) => {
      const link = screen.queryByText(item.linkName);
      expect(link).not.toBeInTheDocument();
    });
  });

  it('should toggle popover state when My Profile button is clicked', () => {
    const profileButton = screen.getByText('My Profile');
    profileData.forEach((item) => {
      const link = screen.queryByText(item.linkName);
      expect(link).not.toBeInTheDocument();
    });
    fireEvent.click(profileButton);
    profileData.forEach((item) => {
      const link = screen.getByText(item.linkName);
      expect(link).toBeInTheDocument();
    });
    fireEvent.click(profileButton);
    profileData.forEach((item) => {
      const link = screen.queryByText(item.linkName);
      expect(link).not.toBeInTheDocument();
    });
  });
});
