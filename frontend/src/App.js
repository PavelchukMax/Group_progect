import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import styled, { createGlobalStyle } from 'styled-components';
import {setUser} from './redux/authSlice'
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import BooksPage from './pages/BooksPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BookInfo from './pages/BookInfo';
import AllRents from './pages/Rents';
import MyRents from './pages/MyRents';
import AddRent from './pages/AddRent';

const GlobalStyle = createGlobalStyle`
  body, html {
    height: 100%;
    margin: 0;
    overflow: hidden;
  }

  body {
    background: #BFBFBF;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const LoadingContainer = styled.div`
  color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
/**
 * Компонент програми, що відображає маршрутизацію та керує глобальним станом.
 * @module App
 * @returns {JSX.Element} Елемент React, що представляє програму.
 */

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);
  

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Layout>
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<MainPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="books" element={<BooksPage />} />
                <Route path="books/:id/BookInfo" element={<BookInfo />} />
                <Route path="AllRents" element={<AllRents />} />
                <Route path="MyRents" element={<MyRents />} />
                <Route path="/addRent" element={<AddRent />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </Layout>
      </AppContainer>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
