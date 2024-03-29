import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, checkIsAuth } from '../redux/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';

/**
 * Компонент для авторизації користувача.
 * @module LoginPage
 * @returns {JSX.Element} Елемент React, що представляє форму авторизації.
 */

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector((state) => state.auth || {});
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

/**
   * Ефект, що перенаправляє користувача на головну сторінку після успішної авторизації.
   * @name useEffect
   * @function
   * @param {string} status - Статус авторизації користувача.
   * @param {boolean} isAuth - Прапор, що вказує на авторизацію користувача.
   * @param {function} navigate - Функція навігації React Router.
   */
  
  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    try {
      await dispatch(loginUser({ username, password }));
      localStorage.setItem('user', JSON.stringify({ username }));
    } catch (error) {
      console.error(error);
      toast.error('Неправильний логін або пароль'); 
    }
  };

  return (
    <div class="outer">
    <form onSubmit={(e) => e.preventDefault()} className="inner">
      <h1 className="login-xl-text text-center">Авторизація</h1>
      <label className="login-text input-outer">
        Логін:
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="rounded-lg login-input-text"
        />
      </label>
      <label className="login-text input-outer">
        Пароль:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="rounded-lg login-input-text"
        />
      </label>
      <div className="flex al-center gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="login-button"
        >
          Увійти
        </button>
        <Link to="/register" className="login-button" style={{width:200}}>
          Реєстрація
        </Link>
      </div>
    </form>
    </div>
  );
};


export default LoginPage;
