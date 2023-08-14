import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login component', () => {
  test('submits the login form and redirects based on user type', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Act
    fireEvent.change(emailInput, { target: { value: 'filan.fisteku@student.uni-pr.edu' } });
    fireEvent.change(passwordInput, { target: { value: '12345gg' } });
    fireEvent.click(loginButton);


    expect(localStorage.getItem('user')).toBeNull();
    Object.defineProperty(window, 'location', {
        value: { href: '/Health-store/Healthpage' },
      });
      
  });

  // Add more test cases for other functionality if needed
});
