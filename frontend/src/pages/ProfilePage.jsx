import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/authSlice';
import '../styles/profile.css'
const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAddress(user.address || 'адресу не надано'); 
    }
  }, [user]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ username, address, password }));
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
          onClick={handleSubmit}
        >
          Вийти
        </button>
      </div>
    </form>
    </div>
  );
};

export default ProfilePage;
