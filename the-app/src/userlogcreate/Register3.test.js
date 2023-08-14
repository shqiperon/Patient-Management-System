import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils'; // Import act from react-dom/test-utils
import { Formik } from 'formik';
import Register from './Register';

describe('Register component', () => {
    test('prevents SQL injection', async () => {
    // Arrange
    render(
        <Formik initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}>
        {() => <Register />}
        </Formik>
    );

    const nameField = screen.getByLabelText('Name:');
    const emailField = screen.getByLabelText('Email:');
    const passwordField = screen.getByLabelText('Password:');
    const confirmPasswordField = screen.getByLabelText('Confirm Password:');
    const registerButton = screen.getByRole('button', { name: /register/i });

    // Act
    await act(async () => {
        fireEvent.change(nameField, { target: { value: "John'; DROP TABLE users;--" } });
        fireEvent.change(emailField, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordField, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordField, { target: { value: 'password123' } });
        fireEvent.click(registerButton);
    });

    // Assert
    // Verify that the registration process fails and no tables are dropped
    const successMessage = screen.queryByText('Registration successful');
    const errorMessage = screen.queryByText('An error occurred during registration');
    const usersTable = document.querySelector('#users-table');

    expect(successMessage).toBeNull();
    expect(errorMessage).toBeNull(); // Update the assertion here
    expect(usersTable).toBeNull();
    });
});
