import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'; 
import store from './redux/store'; 
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';


jest.mock('axios', () => ({
  post: jest.fn()
}));

describe('LoginPage component', () => {
  it('should render the title "Авторизация"', () => {
    render(
      <Provider store={store}>
        <Router> 
          <LoginPage />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Авторизація')).toBeInTheDocument();
  });

  it('should render input fields for "Логін" and "Пароль"', () => {
    render(
      <Provider store={store}>
        <Router> 
          <LoginPage />
        </Router>
      </Provider>
    );
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

  });
  it('should render a "Увійти" button', () => {
    render(
      <Provider store={store}>
        <Router> 
          <LoginPage />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Увійти')).toBeInTheDocument();
  });

  it('should render a link to "Реєстрація"', () => {
    render(
      <Provider store={store}>
        <Router> 
          <LoginPage />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Реєстрація')).toBeInTheDocument();
  });
});