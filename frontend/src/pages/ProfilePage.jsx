import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, logout } from '../redux/authSlice';
import { useNavigate  } from 'react-router-dom';
import '../styles/profile.css'

/**
 * Компонент для відображення та редагування профілю користувача.
 * @module ProfilePage
 * @returns {JSX.Element} Елемент React, що представляє сторінку профілю користувача.
 */

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

/**
   * Ефект, що оновлює значення станів при отриманні даних про користувача.
   * @name useEffect
   * @function
   * @param {object} user - Інформація про користувача.
   */

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAddress(user.address || 'адресу не надано'); 
    }
  }, [user]);

/**
   * Обробник зміни імені користувача.
   * @name handleUsernameChange
   * @function
   * @param {object} e – Об'єкт події зміни.
   */

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  /**
   * Обробник зміни адреси користувача.
   * @name handleAddressChange
   * @function
   * @param {object} e – Об'єкт події зміни.
   */
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  /**
   * Обробник зміни пароля користувача.
   * @name handlePasswordChange
   * @function
   * @param {object} e – Об'єкт події зміни.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Обробник відправки форми редагування профілю користувача.
   * @name handleSubmit
   * @function
   * @param {object} e - Об'єкт події відправки форми.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ username, address, password }));
  };

  /**
   * Обробник виходу користувача з облікового запису.
   * @name handleLogout
   * @function
   */
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className='outer'>
    <form  className="inner profile-container">
      <h1 className='register-xl-text'>Профіль користувача</h1>
      <label htmlFor="username" className='input-outer register-text'>
        Логін:
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className='register-input-text'
        />
      </label>
      <label className='input-outer register-text'>
        Адреса:
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          className='register-input-text'
        />
      </label>
      <label className='input-outer register-text'>
        Пароль:
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className='register-input-text'
        />
      </label>
      <div className="flex gap-8 al-center justify-center mt-4">
        <button
          type="submit"
          className="register-button"
          onClick={handleSubmit}
        >
          Зберегти
        </button>
        <button
          type="submit"
          className="profile-button color-red"
          onClick={handleLogout}
        >
          Вийти
        </button>
      </div>
    </form>
    </div>
  );
};

export default ProfilePage;
