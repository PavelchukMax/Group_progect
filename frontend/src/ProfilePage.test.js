import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import '@testing-library/jest-dom';
import ProfilePage from './pages/ProfilePage';

jest.mock('axios', () => ({
    post: jest.fn()
  }));

describe('ProfilePage component', () => {
  it('should render input fields for "Логін", "Адрес" and "Пароль"', () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Логин:');
    const addressInput = screen.getByLabelText('Адрес:');
    const passwordInput = screen.getByLabelText('Пароль:');

    expect(usernameInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should update state when input fields are changed', () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );

    const usernameInput = screen.getByLabelText('Логин:');
    const addressInput = screen.getByLabelText('Адрес:');
    const passwordInput = screen.getByLabelText('Пароль:');

    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
    fireEvent.change(addressInput, { target: { value: 'testAddress' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    expect(usernameInput.value).toBe('testUsername');
    expect(addressInput.value).toBe('testAddress');
    expect(passwordInput.value).toBe('testPassword');
  });

  it('should submit form with updated data', () => {
    render(
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    );

    const submitButton = screen.getByText('Сохранить');
    fireEvent.click(submitButton);
  });
});