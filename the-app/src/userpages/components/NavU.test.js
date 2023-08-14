import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavU from './NavU';

describe('NavU component', () => {
  test('renders logout button when user is logged in', () => {
    // Arrange
    localStorage.setItem('user', JSON.stringify({ user: { id: 1 } }));

    // Act
    render(
      <MemoryRouter initialEntries={['/userpages']}>
        <NavU />
      </MemoryRouter>
    );

    // Assert
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  // Add more test cases for other scenarios if needed
});
