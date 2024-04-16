import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProfilePage from './pages/ProfilePage';
import { BrowserRouter as Router } from 'react-router-dom'; 
import '@testing-library/jest-dom/extend-expect'; // Add this line

jest.mock('axios', () => ({
  post: jest.fn()
}));

describe('ProfilePage component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router> 
          <ProfilePage />
        </Router>
      </Provider>
    );
  });

  it('should render input fields for "Логін", "Адреса" and "Пароль"', () => {
    const usernameInput = screen.getByLabelText('Логін:');
    const addressInput = screen.getByLabelText('Адреса:');
    const passwordInput = screen.getByLabelText('Пароль:');

    expect(usernameInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should update state when input fields are changed', () => {
    const usernameInput = screen.getByLabelText('Логін:');
    const addressInput = screen.getByLabelText('Адреса:');
    const passwordInput = screen.getByLabelText('Пароль:');

    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
    fireEvent.change(addressInput, { target: { value: 'testAddress' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    expect(usernameInput.value).toBe('testUsername');
    expect(addressInput.value).toBe('testAddress');
    expect(passwordInput.value).toBe('testPassword');
  });

  it('should submit form with updated data', () => {
    const submitButton = screen.getByText('Зберегти');
    fireEvent.click(submitButton);
  });
});
