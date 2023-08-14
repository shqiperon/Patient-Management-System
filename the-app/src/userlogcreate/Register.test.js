import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Formik } from 'formik';
import Register from './Register';

describe('Register component', () => {
  test('displays error message when passwords do not match', async () => {
    // Arrange
    render(
      <Formik initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}>
        {() => <Register />}
      </Formik>
    );

    const passwordField = screen.getByLabelText('Password:');
    const confirmPasswordField = screen.getByLabelText('Confirm Password:');
    const registerButton = screen.getByRole('button', { name: /register/i });

    // Act
    fireEvent.change(passwordField, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordField, { target: { value: 'password1234' } });
    fireEvent.click(registerButton);

    // Assert
    const errorMessage = await screen.findByText('Passwords do not match');
    expect(errorMessage).toBeInTheDocument();
  });

  // Add more test cases for other scenarios if needed
});
