import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // To handle Link components
import SignUp from './SingUp';
import useSignUp from '../../hooks/useSignUp'; // Mock the custom hook

// Mock the useSignUp hook
jest.mock('../../hooks/useSignUp.js');

describe('SignUp Component', () => {
  let mockHandleSignUp, mockLoading, mockError;

  beforeEach(() => {
    // Mock implementation of the useSignUp hook
    mockHandleSignUp = jest.fn();
    mockLoading = false;
    mockError = '';

    useSignUp.mockReturnValue({
      handleSignUp: mockHandleSignUp,
      loading: mockLoading,
      error: mockError,
    });
  });

  test('should render the SignUp form correctly', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signup/i })).toBeInTheDocument();
  });

  test('should update form data when inputs change', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('testuser@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('should call handleSignUp with form data on form submission', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signUpButton = screen.getByRole('button', { name: /Signup/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpButton);

    expect(mockHandleSignUp).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
  });

  test('should display an error message when there is an error', () => {
    useSignUp.mockReturnValue({
      handleSignUp: mockHandleSignUp,
      loading: false,
      error: 'Signup failed',
    });

    render(
      <Router>
        <SignUp />
      </Router>
    );

    expect(screen.getByText('Signup failed')).toBeInTheDocument();
  });

  test('should disable the signup button when loading', () => {
    useSignUp.mockReturnValue({
      handleSignUp: mockHandleSignUp,
      loading: true,
      error: '',
    });

    render(
      <Router>
        <SignUp />
      </Router>
    );

    const signUpButton = screen.getByRole('button', { name: /Signup/i });
    expect(signUpButton).toBeDisabled();
  });
});
